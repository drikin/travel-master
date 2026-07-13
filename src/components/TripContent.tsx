"use client";

import { TripData } from "@/lib/types";

/* ─── Flight Card ─── */
function FlightCard({ f }: { f: TripData["flights"][0] }) {
  const clsColor =
    f.cls.includes("ビジネス") ? "var(--m3-tertiary)" :
    f.cls.includes("ファースト") ? "var(--m3-secondary)" :
    "var(--m3-on-surface-variant)";

  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="m3-label-large" style={{ color: "var(--m3-on-surface-variant)" }}>
          {f.leg}
        </span>
        <span
          className="m3-chip"
          style={{
            backgroundColor: "var(--m3-secondary-container)",
            color: "var(--m3-on-secondary-container)",
            border: "none",
            height: 28,
            padding: "0 14px",
            fontSize: 14,
          }}
        >
          {f.cls}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-left">
          <div className="m3-title-large" style={{ color: "var(--m3-on-surface)" }}>
            {f.from}
          </div>
          <div className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface-variant)" }}>
            {f.depart}
          </div>
        </div>
        <div className="text-center flex-shrink-0" style={{ minWidth: 90 }}>
          <div className="m3-label-large" style={{ color: "var(--m3-primary)" }}>
            {f.flight}
          </div>
          <div className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
            {f.aircraft}
          </div>
          <div className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
            {f.seats}
          </div>
        </div>
        <div className="text-right">
          <div className="m3-title-large" style={{ color: "var(--m3-on-surface)" }}>
            {f.to}
          </div>
          <div className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface-variant)" }}>
            {f.arrive}
          </div>
        </div>
      </div>
      {f.layover && (
        <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--m3-outline-variant)" }}>
          <span className="m3-body-medium" style={{ color: "var(--m3-secondary)" }}>
            ⏱ {f.layover}
          </span>
        </div>
      )}
      {f.lounge && (
        <div className="mt-1">
          <span className="m3-body-medium" style={{ color: "var(--m3-tertiary)" }}>
            🛋️ {f.lounge}
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Day Card ─── */
function DayCard({ d }: { d: TripData["days"][0] }) {
  const isEnd = d.stay === "🏁";
  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: "var(--m3-primary-container)",
          }}
        >
          <span style={{ fontSize: 22 }}>{d.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="m3-title-small" style={{ color: "var(--m3-on-surface)" }}>
              Day {d.day}
            </span>
            <span className="m3-body-small" style={{ color: "var(--m3-on-surface-variant)" }}>
              {d.date}
            </span>
          </div>
          <p className="m3-body-medium" style={{ color: "var(--m3-primary)" }}>
            {d.move}
          </p>
          {d.content && (
            <p className="m3-body-small mt-1" style={{ color: "var(--m3-on-surface-variant)" }}>
              {d.content}
            </p>
          )}
          <div
            className="m3-chip mt-2"
            style={{
              backgroundColor: isEnd ? "var(--m3-tertiary-container)" : "var(--m3-surface-container-high)",
              color: isEnd ? "var(--m3-on-tertiary-container)" : "var(--m3-on-surface-variant)",
              border: isEnd ? "1px solid var(--m3-tertiary)" : undefined,
            }}
          >
            {d.stay}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hotel Card ─── */
function HotelCard({ h }: { h: TripData["hotels"][0] }) {
  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <span style={{ fontSize: 22 }}>🏨</span>
        <div>
          <h3 className="m3-title-small" style={{ color: "var(--m3-on-surface)" }}>
            {h.name}
          </h3>
          <p className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface-variant)" }}>
            {h.nights}
          </p>
        </div>
      </div>
      <hr className="m3-divider" />
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
        {[
          ["住所", h.address],
          ["電話", h.phone],
          ["ルーム", h.room],
          ["CI/CO", `${h.checkin} / ${h.checkout}`],
          ["支払", h.payment],
        ].map(([label, value], i) => (
          <div key={i} className="contents">
            <span className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
              {label}
            </span>
            <span className="m3-body-medium" style={{ color: "var(--m3-on-surface)" }}>
              {value}
            </span>
          </div>
        ))}
      </div>
      <a
        href={h.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="m3-body-medium mt-2"
        style={{ color: "var(--m3-primary)", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "underline" }}
      >
        🗺️ Google Mapsで見る
      </a>
      {h.notes && (
        <p className="m3-body-medium mt-3" style={{ color: "var(--m3-on-surface-variant)" }}>
          {h.notes}
        </p>
      )}
      <div
        className="m3-chip mt-2"
        style={{
          backgroundColor: "var(--m3-primary-container)",
          color: "var(--m3-on-primary-container)",
          border: "none",
        }}
      >
        {h.bookingRef}
      </div>
    </div>
  );
}

/* ─── Section ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="m3-title-small mb-3" style={{ color: "var(--m3-on-surface-variant)" }}>
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

/* ─── Main ─── */
export default function TripContent({ data }: { data: TripData }) {
  const doneCount = data.todo.filter((t) => t.done).length;
  const progressPct = Math.round((doneCount / data.todo.length) * 100);

  return (
    <div style={{ backgroundColor: "var(--m3-background)", minHeight: "100vh", paddingBottom: 32 }}>
      {/* Top App Bar */}
      <header
        className="sticky top-0 z-10"
        style={{
          backgroundColor: "var(--m3-surface-container-low)",
          borderBottom: "1px solid var(--m3-outline-variant)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="px-4 py-3" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                backgroundColor: "var(--m3-primary-container)",
              }}
            >
              <span style={{ fontSize: 20 }}>🗺️</span>
            </div>
            <div>
              <h1 className="m3-title-medium" style={{ color: "var(--m3-on-surface)" }}>
                {data.title}
              </h1>
              <p className="m3-body-small" style={{ color: "var(--m3-on-surface-variant)" }}>
                {data.subtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4" style={{ maxWidth: 720, margin: "0 auto", paddingTop: 16 }}>
        <div className="space-y-5">
          {/* フライト */}
          <Section title="✈️ フライト">
            <div
              className="m3-card p-4"
              style={{
                backgroundColor: "var(--m3-primary-container)",
                border: "1px solid var(--m3-primary)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="m3-label-large" style={{ color: "var(--m3-on-primary-container)" }}>
                    予約番号 {data.bookingRef}
                  </p>
                  <p className="m3-body-medium mt-1" style={{ color: "var(--m3-on-primary-container)", opacity: 0.7 }}>
                    {data.passengers}
                  </p>
                </div>
                <div className="text-right">
                  <p className="m3-body-large" style={{ color: "var(--m3-on-primary-container)" }}>
                    {data.milesCost}
                  </p>
                  <p className="m3-body-medium" style={{ color: "var(--m3-on-primary-container)", opacity: 0.7 }}>
                    残 {data.remainingMiles}
                  </p>
                </div>
              </div>
            </div>

            {/* 行き */}
            <div className="flex items-center gap-2 ml-1">
              <span style={{ fontSize: 18 }}>⬆️</span>
              <h3 className="m3-title-small" style={{ color: "var(--m3-on-surface-variant)" }}>行き</h3>
            </div>
            <div className="space-y-3">
              {data.flights.filter(f => f.leg.startsWith("行き")).map((f, i) => <FlightCard key={i} f={f} />)}
            </div>

            {/* 帰り */}
            <div className="flex items-center gap-2 ml-1 mt-4">
              <span style={{ fontSize: 18 }}>⬇️</span>
              <h3 className="m3-title-small" style={{ color: "var(--m3-on-surface-variant)" }}>帰り</h3>
            </div>
            <div className="space-y-3">
              {data.flights.filter(f => f.leg.startsWith("帰り")).map((f, i) => <FlightCard key={i} f={f} />)}
            </div>
          </Section>

          {/* 日程 */}
          <Section title="📅 日程">
            {data.days.map((d, i) => <DayCard key={i} d={d} />)}
          </Section>

          {/* 宿泊 */}
          <Section title="🏨 宿泊">
            {data.hotels.map((h, i) => <HotelCard key={i} h={h} />)}
            <div
              className="m3-chip"
              style={{
                backgroundColor: "var(--m3-surface-container-high)",
                color: "var(--m3-on-surface-variant)",
              }}
            >
              IHG消費: {data.ihgTotal} / 残 {data.ihgRemaining}
            </div>
          </Section>

          {/* レンタカー */}
          <Section title="🚗 レンタカー">
            <div className="m3-card p-4 m3-fade-in">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  ["会社", data.rentalCar.company],
                  ["予約", data.rentalCar.ref],
                  ["車種", data.rentalCar.car],
                  ["受取", data.rentalCar.pickup],
                  ["返却", data.rentalCar.returnLoc],
                  ["追加Driver", data.rentalCar.extraDriver],
                  ["DW", data.rentalCar.dw],
                  ["距離", data.rentalCar.mileage],
                  ["合計", data.rentalCar.total],
                ].map(([label, value], i) => (
                  <div key={i} className="contents">
                    <span className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
                      {label}
                    </span>
                    <span
                      className="m3-body-medium"
                      style={{
                        color: label === "予約" ? "var(--m3-primary)" : "var(--m3-on-surface)",
                        fontWeight: label === "合計" ? 600 : 400,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pickup Location */}
              <hr className="m3-divider" />
              <div className="mt-3">
                <p className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
                  📍 Pickup
                </p>
                <p className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface)" }}>
                  {data.rentalCar.pickupAddress}
                </p>
                <a
                  href={data.rentalCar.pickupMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m3-body-medium mt-1"
                  style={{ color: "var(--m3-primary)", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "underline" }}
                >
                  🗺️ Google Mapsで見る
                </a>
              </div>

              {/* Return Location */}
              <div className="mt-3">
                <p className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
                  📍 Drop-off
                </p>
                <p className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface)" }}>
                  {data.rentalCar.returnAddress}
                </p>
                <a
                  href={data.rentalCar.returnMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m3-body-medium mt-1"
                  style={{ color: "var(--m3-primary)", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "underline" }}
                >
                  🗺️ Google Mapsで見る
                </a>
              </div>

              <hr className="m3-divider" />
              <p className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
                📞 {data.rentalCar.phone}（{data.rentalCar.hours}）
              </p>
            </div>
          </Section>

          {/* ディナー */}
          {data.dinners.length > 0 && (
            <Section title="🍽️ ディナー予約">
              {data.dinners.map((d, i) => (
                <div key={i} className="m3-card p-4 m3-fade-in">
                  <div className="flex items-center justify-between mb-1">
                    <span className="m3-title-small" style={{ color: "var(--m3-on-surface)" }}>
                      {d.venue}
                    </span>
                    <span className="m3-label-large" style={{ color: "var(--m3-secondary)" }}>
                      {d.time}
                    </span>
                  </div>
                  <p className="m3-body-medium" style={{ color: "var(--m3-on-surface-variant)" }}>
                    {d.date} {d.notes}
                  </p>
                  <p className="m3-body-medium mt-1" style={{ color: "var(--m3-on-surface)" }}>
                    📍 {d.address}
                  </p>
                  <a
                    href={d.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="m3-body-medium mt-1"
                    style={{ color: "var(--m3-primary)", display: "inline-flex", alignItems: "center", gap: 4, textDecoration: "underline" }}
                  >
                    🗺️ Google Mapsで見る
                  </a>
                </div>
              ))}
            </Section>
          )}

          {/* 旅行保険 */}
          <Section title="🛡️ 旅行保険">
            <div className="m3-card p-4 m3-fade-in">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  ["会社", data.insurance.provider],
                  ["プラン", data.insurance.plan],
                  ["証明書", data.insurance.certNumber],
                  ["期間", data.insurance.period],
                  ["加入者", data.insurance.travelers],
                  ["医療限度額", data.insurance.medicalMax],
                  ["免責", data.insurance.deductible],
                  ["緊急搬送", data.insurance.evacuation],
                  ["緊急連絡", data.insurance.emergencyPhone],
                ].map(([label, value], i) => (
                  <div key={i} className="contents">
                    <span className="m3-body-small" style={{ color: "var(--m3-on-surface-variant)" }}>
                      {label}
                    </span>
                    <span
                      className="m3-body-small"
                      style={{
                        color: label === "緊急連絡" ? "var(--m3-primary)" : "var(--m3-on-surface)",
                        fontWeight: label === "医療限度額" || label === "緊急搬送" ? 600 : 400,
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              {data.insurance.notes && (
                <hr className="m3-divider" />
              )}
              {data.insurance.notes && (
                <p className="m3-body-small mt-1" style={{ color: "var(--m3-on-surface-variant)" }}>
                  {data.insurance.notes}
                </p>
              )}
            </div>
          </Section>

          {/* TODO */}
          <Section title="✅ 準備リスト">
            <div className="m3-card p-4">
              <div className="m3-linear-progress mb-3">
                <div className="m3-linear-progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="m3-body-small text-center mb-4" style={{ color: "var(--m3-on-surface-variant)" }}>
                {doneCount}/{data.todo.length} 完了
              </p>
              <div className="space-y-2">
                {data.todo.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 py-1">
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 4,
                        border: `2px solid ${t.done ? "var(--m3-primary)" : "var(--m3-outline)"}`,
                        backgroundColor: t.done ? "var(--m3-primary)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {t.done && (
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="var(--m3-on-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="m3-body-medium"
                      style={{
                        color: t.done ? "var(--m3-on-surface-variant)" : "var(--m3-on-surface)",
                        textDecoration: t.done ? "line-through" : "none",
                      }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* メモ */}
          <Section title="📝 メモ">
            <div className="m3-card p-4">
              <ul className="space-y-2">
                {data.notes.map((n, i) => {
                  const isLink = n.startsWith("📎 ");
                  const linkMatch = isLink ? n.match(/https?:\/\/[^\s]+/) : null;
                  return (
                    <li key={i} className="m3-body-medium flex gap-2" style={{ color: "var(--m3-on-surface-variant)" }}>
                      {isLink && linkMatch ? (
                        <>
                          <span style={{ color: "var(--m3-primary)", flexShrink: 0 }}>•</span>
                          <span>{n.replace(linkMatch[0], "")}</span>
                          <a
                            href={linkMatch[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--m3-primary)", textDecoration: "underline" }}
                          >
                            {linkMatch[0]}
                          </a>
                        </>
                      ) : (
                        <>
                          <span style={{ color: "var(--m3-primary)", flexShrink: 0 }}>•</span>
                          {n}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Section>

          {/* Footer */}
          <div className="text-center py-6">
            <p className="m3-body-small" style={{ color: "var(--m3-on-surface-variant)" }}>
              Made with ❤️ by DriMac
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
