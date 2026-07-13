"use client";

import { TripData } from "@/lib/types";

/* ─── Shared link component ─── */
function MapLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="m3-map-link"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
      </svg>
      マップで見る
    </a>
  );
}

/* ─── Flight Card ─── */
function FlightCard({ f }: { f: TripData["flights"][0] }) {
  return (
    <div className="m3-card p-4">
      <div className="flight-header">
        <span className="flight-leg">{f.leg}</span>
        <span className={`flight-cls ${f.cls.includes("ファースト") ? "cls-first" : f.cls.includes("ビジネス") ? "cls-business" : "cls-economy"}`}>
          {f.cls}
        </span>
      </div>
      <div className="flight-route">
        <div className="flight-point">
          <div className="flight-city">{f.from}</div>
          <div className="flight-time">{f.depart}</div>
        </div>
        <div className="flight-middle">
          <div className="flight-num">{f.flight}</div>
          <div className="flight-sub">{f.aircraft}</div>
          <div className="flight-sub">{f.seats}</div>
        </div>
        <div className="flight-point flight-point-right">
          <div className="flight-city">{f.to}</div>
          <div className="flight-time">{f.arrive}</div>
        </div>
      </div>
      {f.layover && (
        <div className="flight-info">
          <span className="info-icon">⏱</span> {f.layover}
        </div>
      )}
      {f.lounge && (
        <div className="flight-info flight-lounge">
          <span className="info-icon">🛋️</span> {f.lounge}
        </div>
      )}
    </div>
  );
}

/* ─── Day Card ─── */
function DayCard({ d }: { d: TripData["days"][0] }) {
  const isEnd = d.stay === "🏁";
  return (
    <div className="m3-card p-4">
      <div className="day-layout">
        <div className="day-icon-wrap">
          <span className="day-icon">{d.icon}</span>
        </div>
        <div className="day-body">
          <div className="day-top">
            <span className="day-label">Day {d.day}</span>
            <span className="day-date">{d.date}</span>
          </div>
          <p className="day-move">{d.move}</p>
          {d.content && <p className="day-note">{d.content}</p>}
          <span className={`day-stay ${isEnd ? "stay-end" : ""}`}>{d.stay}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Hotel Card ─── */
function HotelCard({ h }: { h: TripData["hotels"][0] }) {
  return (
    <div className="m3-card p-4">
      <div className="hotel-top">
        <span className="hotel-icon">🏨</span>
        <div>
          <h3 className="hotel-name">{h.name}</h3>
          <p className="hotel-nights">{h.nights}</p>
        </div>
      </div>
      <div className="m3-divider" />
      <div className="hotel-grid">
        {[
          ["住所", h.address],
          ["電話", h.phone],
          ["ルーム", h.room],
          ["CI/CO", `${h.checkin} / ${h.checkout}`],
          ["支払", h.payment],
        ].map(([label, value], i) => (
          <div key={i} className="hotel-row">
            <span className="hotel-label">{label}</span>
            <span className="hotel-value">{value}</span>
          </div>
        ))}
      </div>
      <MapLink href={h.mapLink} />
      {h.notes && <p className="hotel-notes">{h.notes}</p>}
      <span className="hotel-ref">{h.bookingRef}</span>
    </div>
  );
}

/* ─── Section ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section-group">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

/* ─── Main ─── */
export default function TripContent({ data }: { data: TripData }) {
  const doneCount = data.todo.filter((t) => t.done).length;
  const progressPct = Math.round((doneCount / data.todo.length) * 100);

  return (
    <div className="app-root">
      {/* Top App Bar */}
      <header className="app-bar">
        <div className="app-bar-inner">
          <div className="app-bar-content">
            <div className="app-bar-icon">🗺️</div>
            <div>
              <h1 className="app-bar-title">{data.title}</h1>
              <p className="app-bar-sub">{data.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="main-content">
        {/* フライト */}
        <Section title="✈️ フライト">
          <div className="booking-card">
            <div className="booking-left">
              <p className="booking-ref">予約番号 {data.bookingRef}</p>
              <p className="booking-passengers">{data.passengers}</p>
            </div>
            <div className="booking-right">
              <p className="booking-cost">{data.milesCost}</p>
              <p className="booking-remaining">残 {data.remainingMiles}</p>
            </div>
          </div>

          <div className="flight-group-label"><span>⬆️</span> 行き</div>
          <div className="card-stack">
            {data.flights.filter(f => f.leg.startsWith("行き")).map((f, i) => <FlightCard key={i} f={f} />)}
          </div>

          <div className="flight-group-label"><span>⬇️</span> 帰り</div>
          <div className="card-stack">
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
          <div className="ihg-chip">IHG消費: {data.ihgTotal} / 残 {data.ihgRemaining}</div>
        </Section>

        {/* レンタカー */}
        <Section title="🚗 レンタカー">
          <div className="m3-card p-4">
            <div className="rental-grid">
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
                <div key={i} className="rental-row">
                  <span className="rental-label">{label}</span>
                  <span className={`rental-value ${label === "予約" ? "rental-highlight" : ""} ${label === "合計" ? "rental-bold" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
            <div className="m3-divider" />
            <div className="rental-location">
              <p className="location-label">📍 Pickup</p>
              <p className="location-addr">{data.rentalCar.pickupAddress}</p>
              <MapLink href={data.rentalCar.pickupMap} />
            </div>
            <div className="rental-location">
              <p className="location-label">📍 Drop-off</p>
              <p className="location-addr">{data.rentalCar.returnAddress}</p>
              <MapLink href={data.rentalCar.returnMap} />
            </div>
            <div className="m3-divider" />
            <p className="rental-phone">📞 {data.rentalCar.phone}（{data.rentalCar.hours}）</p>
          </div>
        </Section>

        {/* ディナー */}
        {data.dinners.length > 0 && (
          <Section title="🍽️ ディナー予約">
            {data.dinners.map((d, i) => (
              <div key={i} className="m3-card p-4">
                <div className="dinner-top">
                  <span className="dinner-venue">{d.venue}</span>
                  <span className="dinner-time">{d.time}</span>
                </div>
                <p className="dinner-meta">{d.date} {d.notes}</p>
                <p className="dinner-addr">📍 {d.address}</p>
                <MapLink href={d.mapLink} />
              </div>
            ))}
          </Section>
        )}

        {/* 旅行保険 */}
        <Section title="🛡️ 旅行保険">
          <div className="m3-card p-4">
            <div className="insurance-grid">
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
                <div key={i} className="insurance-row">
                  <span className="insurance-label">{label}</span>
                  <span className={`insurance-value ${label === "緊急連絡" ? "insurance-emergency" : ""} ${label === "医療限度額" || label === "緊急搬送" ? "insurance-bold" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
            {data.insurance.notes && (
              <>
                <div className="m3-divider" />
                <p className="insurance-note">{data.insurance.notes}</p>
              </>
            )}
          </div>
        </Section>

        {/* TODO */}
        <Section title="✅ 準備リスト">
          <div className="m3-card p-4">
            <div className="progress-wrap">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="progress-text">{doneCount}/{data.todo.length} 完了</p>
            </div>
            <div className="todo-list">
              {data.todo.map((t, i) => (
                <div key={i} className="todo-item">
                  <div className={`todo-checkbox ${t.done ? "checked" : ""}`}>
                    {t.done && (
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="var(--m3-on-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`todo-label ${t.done ? "done" : ""}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* メモ */}
        <Section title="📝 メモ">
          <div className="m3-card p-4">
            <ul className="notes-list">
              {data.notes.map((n, i) => {
                const dropboxUrl = "https://www.dropbox.com/scl/fo/e5a0ervr6jl8qqyvz1107/AFRfKxaKIwp8vDBC93d90rk?rlkey=rcclaybjui7e1b2y88o3pni1w&dl=0";
                const isDropbox = n.startsWith("📎 ");
                return (
                  <li key={i} className="note-item">
                    {isDropbox ? (
                      <a href={dropboxUrl} target="_blank" rel="noopener noreferrer" className="note-link">{n}</a>
                    ) : (
                      <span>{n}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>

        {/* Footer */}
        <footer className="app-footer">
          <p>Made with ❤️ by DriMac</p>
        </footer>
      </main>
    </div>
  );
}
