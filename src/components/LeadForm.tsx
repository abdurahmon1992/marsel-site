"use client";

import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { formatLocalPhone, isValidLocalPhone, parseLocalPhone } from "@/lib/phone";
import { SERVICE_EVENT } from "./SelectService";

export type FormDict = {
  name: string;
  namePlaceholder: string;
  phone: string;
  instagram: string;
  instagramPlaceholder: string;
  optional: string;
  service: string;
  clearService: string;
  submit: string;
  sending: string;
  consent: string;
  privacyLink: string;
  successTitle: string;
  successText: string;
  error: string;
  errorRate: string;
  required: string;
  phoneInvalid: string;
  niche: string;
  nichePlaceholder: string;
  serviceSelect: string;
  serviceSelectPlaceholder: string;
  comment: string;
  commentPlaceholder: string;
};

type Props = {
  t: FormDict;
  lang: string;
  privacyHref: string;
  telegramUrl: string;
  /** short — ism, telefon, Instagram (bosh sahifa); full — + soha, xizmat, izoh (/audit) */
  variant?: "short" | "full";
  serviceOptions?: string[];
};

type Status = "idle" | "sending" | "success" | "error" | "rate";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORAGE = "marsel_utm";

/** Birinchi tashrifdagi UTM'lar sessiya davomida saqlanadi. */
function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 200);
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_STORAGE, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}");
  } catch {
    return fromUrl;
  }
}

const field =
  "h-12 w-full border border-transparent bg-bg px-4 text-base text-text placeholder:text-muted focus:border-accent focus:outline-none aria-[invalid=true]:border-accent";
const label = "mb-1.5 block text-xs font-semibold tracking-wide text-on-surface-muted uppercase";

export function LeadForm({ t, lang, privacyHref, telegramUrl, variant = "short", serviceOptions = [] }: Props) {
  const full = variant === "full";
  const id = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // mahalliy 9 raqam
  const [instagram, setInstagram] = useState("");
  const [service, setService] = useState("");
  const [niche, setNiche] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    // ?service=... (masalan, reklama havolasidan) va "Batafsil" tugmalaridan
    // (gidratatsiyadan keyin o'qiladi — server HTML bilan farq bo'lmasligi uchun)
    const initial = new URLSearchParams(window.location.search).get("service");
    if (initial) queueMicrotask(() => setService(initial.slice(0, 80)));
    const onSelect = (e: Event) => setService(String((e as CustomEvent).detail ?? ""));
    window.addEventListener(SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SERVICE_EVENT, onSelect);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = t.required;
    if (!isValidLocalPhone(phone)) next.phone = t.phoneInvalid;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: `+998${phone}`,
          instagram: instagram.trim(),
          service,
          niche: niche.trim(),
          comment: comment.trim(),
          lang,
          page: window.location.pathname,
          utm: readUtm(),
          website: honeypot,
        }),
      });
      if (res.ok) {
        setStatus("success");
        track("lead_submit", { lang, service: service || undefined });
      } else {
        setStatus(res.status === 429 ? "rate" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="bg-bg p-8 text-text">
        <p className="font-display text-3xl font-bold uppercase">{t.successTitle}</p>
        <p className="mt-2 text-muted">{t.successText}</p>
      </div>
    );
  }

  const [consentBefore, consentAfter] = t.consent.split("{privacy}");

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {!full && service && (
        <p className="flex items-center gap-2 text-sm">
          <span className="text-on-surface-muted">{t.service}:</span>
          <span className="inline-flex items-center gap-2 bg-accent px-3 py-1 font-semibold text-on-accent">
            {service}
            <button
              type="button"
              onClick={() => setService("")}
              aria-label={t.clearService}
              className="-mr-1 px-1 leading-none"
            >
              ×
            </button>
          </span>
        </p>
      )}

      <div>
        <label htmlFor={`${id}-name`} className={label}>
          {t.name} *
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 100))}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id}-name-err` : undefined}
          className={field}
        />
        {errors.name && (
          <p id={`${id}-name-err`} className="mt-1 text-sm text-accent">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={label}>
          {t.phone} *
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 90 123 45 67"
          value={formatLocalPhone(phone)}
          onChange={(e) => setPhone(parseLocalPhone(e.target.value))}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
          className={field}
        />
        {errors.phone && (
          <p id={`${id}-phone-err`} className="mt-1 text-sm text-accent">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-ig`} className={label}>
          {t.instagram} <span className="font-normal normal-case">({t.optional})</span>
        </label>
        <input
          id={`${id}-ig`}
          name="instagram"
          placeholder={t.instagramPlaceholder}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value.slice(0, 200))}
          className={field}
        />
      </div>

      {full && (
        <>
          <div>
            <label htmlFor={`${id}-niche`} className={label}>
              {t.niche} <span className="font-normal normal-case">({t.optional})</span>
            </label>
            <input
              id={`${id}-niche`}
              name="niche"
              placeholder={t.nichePlaceholder}
              value={niche}
              onChange={(e) => setNiche(e.target.value.slice(0, 100))}
              className={field}
            />
          </div>
          <div>
            <label htmlFor={`${id}-service`} className={label}>
              {t.serviceSelect} <span className="font-normal normal-case">({t.optional})</span>
            </label>
            <select
              id={`${id}-service`}
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={`${field} appearance-none bg-[linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%)] bg-[size:6px_6px] bg-[position:calc(100%-22px)_center,calc(100%-16px)_center] bg-no-repeat pr-10`}
            >
              <option value="">{t.serviceSelectPlaceholder}</option>
              {[...new Set([...serviceOptions, ...(service && !serviceOptions.includes(service) ? [service] : [])])].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`${id}-comment`} className={label}>
              {t.comment} <span className="font-normal normal-case">({t.optional})</span>
            </label>
            <textarea
              id={`${id}-comment`}
              name="comment"
              rows={3}
              placeholder={t.commentPlaceholder}
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 1000))}
              className={`${field} h-auto py-3`}
            />
          </div>
        </>
      )}

      {/* Honeypot: odamlar ko'rmaydi, botlar to'ldiradi */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex h-14 items-center justify-center bg-accent px-8 text-sm font-semibold tracking-wide text-on-accent uppercase transition-colors hover:bg-accent-hover disabled:opacity-70"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>

      {(status === "error" || status === "rate") && (
        <p role="alert" className="bg-bg p-4 text-sm text-text">
          {status === "rate" ? t.errorRate : t.error}{" "}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("telegram_click", { source: "form_error" })}
            className="font-semibold text-accent underline"
          >
            @{telegramUrl.split("/").pop()}
          </a>
        </p>
      )}

      <p className="text-xs text-on-surface-muted">
        {consentBefore}
        <Link href={privacyHref} className="underline hover:text-on-surface">
          {t.privacyLink}
        </Link>
        {consentAfter}
      </p>
    </form>
  );
}
