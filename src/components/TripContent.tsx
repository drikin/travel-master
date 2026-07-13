"use client";

import { TripData } from "@/lib/types";

function FlightCard({ f }: { f: TripData["flights"][0] }) {
  const clsColor =
    f.cls.includes("ビジネス") ? "var(--m3-tertiary)" :
    f.cls.includes("ファースト") ? "var(--m3-secondary)" :
    "var(--m3-on-surface-variant)";

  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span
          className="m3-label-small"
          style={{ color: "var(--m3-on-surface-variant)" }}
        >
          {f.leg}
        </span>
        <span
          className="m3-chip"
          style={{
            backgroundColor: "var(--m3-secondary-container)",
            color: "var(--m3-on-secondary-container)",
            border: "none",
            height: 24,
            padding: "0 10px",
          }}
        >
          {f.cls}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-left">
          <div
            className="m3-title-medium"
            style={{ color: "var(--m3-on-surface)" }}
          >
            {f.from}
          </div>
          <div
            className="m3-body-small"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {f.depart}
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <div
            className="m3-label-small"
            style={{ color: "var(--m3-primary)" }}
          >
            {f.flight}
          </div>
          <div
            className="m3-body-small"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {f.aircraft}
          </div>
          <div
            className="m3-body-small"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {f.seats}
          </div>
        </div>
        <div className="text-right">
          <div
            className="m3-title-medium"
            style={{ color: "var(--m3-on-surface)" }}
          >
            {f.to}
          </div>
          <div
            className="m3-body-small"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {f.arrive}
          </div>
        </div>
      </div>
    </div>
  );
}

function DayCard({ d }: { d: TripData["days"][0] }) {
  const isEnd = d.stay === "🏁";
  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "var(--m3-primary-container)",
            flexShrink: 0,
          }}
        >
          <span className="text-xl">{d.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span
              className="m3-title-small"
              style={{ color: "var(--m3-on-surface)" }}
            >
              Day {d.day}
            </span>
            <span
              className="m3-body-small"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              {d.date}
            </span>
          </div>
          <p
            className="m3-body-medium"
            style={{ color: "var(--m3-primary)" }}
          >
            {d.move}
          </p>
          {d.content && (
            <p
              className="m3-body-small mt-1"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              {d.content}
            </p>
          )}
          <div
            className="m3-chip mt-2"
            style={{
              backgroundColor: isEnd
                ? "var(--m3-tertiary-container)"
                : "var(--m3-surface-container-high)",
              color: isEnd
                ? "var(--m3-on-tertiary-container)"
                : "var(--m3-on-surface-variant)",
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

function HotelCard({ h }: { h: TripData["hotels"][0] }) {
  return (
    <div className="m3-card p-4 m3-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xl">🏨</span>
        <div>
          <h3
            className="m3-title-small"
            style={{ color: "var(--m3-on-surface)" }}
          >
            {h.name}
          </h3>
          <p
            className="m3-body-small"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {h.nights}
          </p>
        </div>
      </div>
      <hr className="m3-divider" />
      <div
        className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3"
        style={{ fontSize: 13 }}
      >
        <span style={{ color: "var(--m3-on-surface-variant)" }}>住所</span>
        <span style={{ color: "var(--m3-on-surface)" }} className="truncate">
          {h.address}
        </span>
        <span style={{ color: "var(--m3-on-surface-variant)" }}>電話</span>
        <span style={{ color: "var(--m3-on-surface)" }}>{h.phone}</span>
        <span style={{ color: "var(--m3-on-surface-variant)" }}>ルーム</span>
        <span style={{ color: "var(--m3-on-surface)" }}>{h.room}</span>
        <span style={{ color: "var(--m3-on-surface-variant)" }}>CI/CO</span>
        <span style={{ color: "var(--m3-on-surface)" }}>
          {h.checkin} / {h.checkout}
        </span>
        <span style={{ color: "var(--m3-on-surface-variant)" }}>支払</span>
        <span style={{ color: "var(--m3-on-surface)" }}>{h.payment}</span>
      </div>
      {h.notes && (
        <p
          className="m3-body-small mt-2"
          style={{ color: "var(--m3-on-surface-variant)" }}
        >
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

export default function TripContent({ data }: { data: TripData }) {
  const doneCount = data.todo.filter((t) => t.done).length;
  const progressPct = Math.round((doneCount / data.todo.length) * 100);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ backgroundColor: "var(--m3-background)" }}
    >
      {/* M3 Top App Bar */}
      <header
        className="sticky top-0 z-10 px-4 py-3"
        style={{
          backgroundColor: "var(--m3-surface-container-low)",
          borderBottom: "1px solid var(--m3-outline-variant)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: "var(--m3-primary-container)",
            }}
          >
            <span className="text-lg">🗺️</span>
          </div>
          <div>
            <h1
              className="m3-title-medium"
              style={{ color: "var(--m3-on-surface)" }}
            >
              {data.title}
            </h1>
            <p
              className="m3-body-small"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              {data.subtitle}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-4 mt-4">
        {/* M3 Card: 予約番号 */}
        <div
          className="m3-card p-4"
          style={{
            backgroundColor: "var(--m3-primary-container)",
            border: "1px solid var(--m3-primary)",
          }}
        >
          <div className="text-center">
            <p
              className="m3-label-medium"
              style={{ color: "var(--m3-on-primary-container)" }}
            >
              予約番号 {data.bookingRef}
            </p>
            <p
              className="m3-body-small mt-1"
              style={{ color: "var(--m3-on-primary-container)" }}
            >
              {data.milesCost}
            </p>
            <p
              className="m3-body-small"
              style={{ color: "var(--m3-on-primary-container)", opacity: 0.7 }}
            >
              残 {data.remainingMiles}
            </p>
          </div>
        </div>

        {/* フライト */}
        <Section title="✈️ フライト">
          {data.flights.map((f, i) => (
            <FlightCard key={i} f={f} />
          ))}
          <p
            className="m3-body-small text-center mt-2"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {data.passengers}
          </p>
        </Section>

        {/* 日程 */}
        <Section title="📅 日程">
          {data.days.map((d, i) => (
            <DayCard key={i} d={d} />
          ))}
        </Section>

        {/* 宿泊 */}
        <Section title="🏨 宿泊">
          {data.hotels.map((h, i) => (
            <HotelCard key={i} h={h} />
          ))}
          <div
            className="m3-chip mx-auto"
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
            <div
              className="grid grid-cols-2 gap-x-3 gap-y-2"
              style={{ fontSize: 13 }}
            >
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                会社
              </span>
              <span style={{ color: "var(--m3-on-surface)" }}>
                {data.rentalCar.company}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                予約
              </span>
              <span style={{ color: "var(--m3-primary)" }}>
                {data.rentalCar.ref}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                車種
              </span>
              <span style={{ color: "var(--m3-on-surface)" }}>
                {data.rentalCar.car}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                受取
              </span>
              <span style={{ color: "var(--m3-on-surface)" }}>
                {data.rentalCar.pickup}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                返却
              </span>
              <span style={{ color: "var(--m3-on-surface)" }}>
                {data.rentalCar.returnLoc}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                DW
              </span>
              <span style={{ color: "var(--m3-tertiary)" }}>
                {data.rentalCar.dw}
              </span>
              <span style={{ color: "var(--m3-on-surface-variant)" }}>
                合計
              </span>
              <span
                className="m3-title-small"
                style={{ color: "var(--m3-on-surface)" }}
              >
                {data.rentalCar.total}
              </span>
            </div>
            <hr className="m3-divider" />
            <p
              className="m3-body-small"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
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
                  <span
                    className="m3-title-small"
                    style={{ color: "var(--m3-on-surface)" }}
                  >
                    {d.venue}
                  </span>
                  <span
                    className="m3-label-medium"
                    style={{ color: "var(--m3-secondary)" }}
                  >
                    {d.time}
                  </span>
                </div>
                <p
                  className="m3-body-small"
                  style={{ color: "var(--m3-on-surface-variant)" }}
                >
                  {d.date} {d.notes}
                </p>
              </div>
            ))}
          </Section>
        )}

        {/* TODO */}
        <Section title="✅ 準備リスト">
          <div className="m3-card p-4">
            {/* M3 Linear Progress */}
            <div className="m3-linear-progress mb-4">
              <div
                className="m3-linear-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p
              className="m3-body-small text-center mb-3"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              {doneCount}/{data.todo.length} 完了
            </p>
            <div className="space-y-1">
              {data.todo.map((t, i) => (
                <div key={i} className="flex items-center gap-3 py-1">
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: `2px solid ${
                        t.done
                          ? "var(--m3-primary)"
                          : "var(--m3-outline)"
                      }`,
                      backgroundColor: t.done
                        ? "var(--m3-primary)"
                        : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {t.done && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="var(--m3-on-primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="m3-body-medium"
                    style={{
                      color: t.done
                        ? "var(--m3-on-surface-variant)"
                        : "var(--m3-on-surface)",
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
              {data.notes.map((n, i) => (
                <li
                  key={i}
                  className="m3-body-medium flex gap-2"
                  style={{ color: "var(--m3-on-surface-variant)" }}
                >
                  <span style={{ color: "var(--m3-primary)" }}>•</span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Footer */}
        <div
          className="text-center py-6"
          style={{ color: "var(--m3-on-surface-variant)" }}
        >
          <p className="m3-body-small">Made with ❤️ by DriMac</p>
        </div>
      </main>

      {/* M3 Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-10 m3-nav-bar px-4"
        style={{
          backgroundColor: "var(--m3-surface-container-low)",
          borderTop: "1px solid var(--m3-outline-variant)",
        }}
      >
        <div className="max-w-lg mx-auto w-full flex items-center justify-around">
          <NavItem icon="🗓️" label="日程" active />
          <NavItem icon="✈️" label="フライト" />
          <NavItem icon="🏨" label="宿泊" />
          <NavItem icon="✅" label="準備" />
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-1"
      style={{
        height: 56,
        minWidth: 64,
        padding: "0 12px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <span
        className="text-xl"
        style={{
          color: active ? "var(--m3-on-surface)" : "var(--m3-on-surface-variant)",
        }}
      >
        {icon}
      </span>
      <span
        className="m3-label-small"
        style={{
          color: active ? "var(--m3-on-surface)" : "var(--m3-on-surface-variant)",
        }}
      >
        {label}
      </span>
      {active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 64,
            height: 3,
            borderRadius: "0 0 3px 3px",
            backgroundColor: "var(--m3-primary)",
          }}
        />
      )}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="m3-title-small mb-3 flex items-center gap-2"
        style={{ color: "var(--m3-on-surface-variant)" }}
      >
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
