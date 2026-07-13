"use client";

import { TripData } from "@/lib/types";

function FlightCard({ f }: { f: TripData["flights"][0] }) {
  const clsColor =
    f.cls.includes("ビジネス") ? "text-amber-300" :
    f.cls.includes("ファースト") ? "text-purple-300" :
    "text-gray-300";
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-gray-500">{f.leg}</span>
        <span className={`text-xs font-bold ${clsColor}`}>{f.cls}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-left">
          <div className="text-lg font-bold text-white">{f.from}</div>
          <div className="text-xs text-gray-400">{f.depart}</div>
        </div>
        <div className="text-center flex-shrink-0">
          <div className="text-xs text-gray-500">{f.flight}</div>
          <div className="text-gray-600 text-xs">{f.aircraft}</div>
          <div className="text-[10px] text-gray-600">{f.seats}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">{f.to}</div>
          <div className="text-xs text-gray-400">{f.arrive}</div>
        </div>
      </div>
    </div>
  );
}

function DayCard({ d }: { d: TripData["days"][0] }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-start gap-3">
        <div className="text-2xl w-8 text-center">{d.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Day {d.day}</span>
            <span className="text-xs text-gray-500">{d.date}</span>
          </div>
          <p className="text-sm text-blue-300 mt-0.5">{d.move}</p>
          {d.content && <p className="text-xs text-gray-400 mt-1">{d.content}</p>}
          <div className="mt-2 text-xs text-gray-500 bg-white/5 rounded-lg px-2 py-1 inline-block">{d.stay}</div>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ h }: { h: TripData["hotels"][0] }) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-lg">🏨</span>
        <div>
          <h3 className="text-sm font-bold text-white">{h.name}</h3>
          <p className="text-xs text-gray-500">{h.nights}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <span className="text-gray-500">住所</span><span className="text-gray-300 truncate">{h.address}</span>
        <span className="text-gray-500">電話</span><span className="text-gray-300">{h.phone}</span>
        <span className="text-gray-500">ルーム</span><span className="text-gray-300">{h.room}</span>
        <span className="text-gray-500">CI/CO</span><span className="text-gray-300">{h.checkin} / {h.checkout}</span>
        <span className="text-gray-500">支払</span><span className="text-gray-300">{h.payment}</span>
      </div>
      {h.notes && <p className="text-xs text-gray-500 mt-2">{h.notes}</p>}
      <p className="text-xs text-blue-400 mt-1">{h.bookingRef}</p>
    </div>
  );
}

export default function TripContent({ data }: { data: TripData }) {
  const doneCount = data.todo.filter((t) => t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-white">{data.title}</h1>
          <p className="text-xs text-blue-300">{data.subtitle}</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 space-y-4 mt-4">
        {/* 予約番号 */}
        <div className="bg-blue-600/20 rounded-xl p-3 border border-blue-500/30 text-center">
          <p className="text-xs text-blue-300">予約番号 {data.bookingRef}</p>
          <p className="text-xs text-gray-400 mt-0.5">{data.milesCost}</p>
          <p className="text-xs text-gray-500">残 {data.remainingMiles}</p>
        </div>

        {/* フライト */}
        <Section title="✈️ フライト">
          {data.flights.map((f, i) => <FlightCard key={i} f={f} />)}
          <p className="text-xs text-gray-500 text-center">{data.passengers}</p>
        </Section>

        {/* 日程 */}
        <Section title="📅 日程">
          {data.days.map((d, i) => <DayCard key={i} d={d} />)}
        </Section>

        {/* 宿泊 */}
        <Section title="🏨 宿泊">
          {data.hotels.map((h, i) => <HotelCard key={i} h={h} />)}
          <div className="text-xs text-gray-500 text-center">
            IHG消費: {data.ihgTotal} / 残 {data.ihgRemaining}
          </div>
        </Section>

        {/* レンタカー */}
        <Section title="🚗 レンタカー">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
              <span className="text-gray-500">会社</span><span className="text-gray-300">{data.rentalCar.company}</span>
              <span className="text-gray-500">予約</span><span className="text-blue-400">{data.rentalCar.ref}</span>
              <span className="text-gray-500">車種</span><span className="text-gray-300">{data.rentalCar.car}</span>
              <span className="text-gray-500">受取</span><span className="text-gray-300">{data.rentalCar.pickup}</span>
              <span className="text-gray-500">返却</span><span className="text-gray-300">{data.rentalCar.returnLoc}</span>
              <span className="text-gray-500">追加Driver</span><span className="text-gray-300">{data.rentalCar.extraDriver}</span>
              <span className="text-gray-500">DW</span><span className="text-green-400">{data.rentalCar.dw}</span>
              <span className="text-gray-500">距離</span><span className="text-gray-300">{data.rentalCar.mileage}</span>
              <span className="text-gray-500">合計</span><span className="text-white font-bold">{data.rentalCar.total}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">📞 {data.rentalCar.phone}（{data.rentalCar.hours}）</p>
          </div>
        </Section>

        {/* ディナー */}
        {data.dinners.length > 0 && (
          <Section title="🍽️ ディナー予約">
            {data.dinners.map((d, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{d.venue}</span>
                  <span className="text-xs text-amber-300">{d.time}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{d.date} {d.notes}</p>
              </div>
            ))}
          </Section>
        )}

        {/* TODO */}
        <Section title="✅ 準備リスト">
          <div className="space-y-1.5">
            {data.todo.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={t.done ? "text-green-400" : "text-gray-600"}>{t.done ? "✓" : "○"}</span>
                <span className={t.done ? "text-gray-500 line-through" : "text-gray-300"}>{t.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">{doneCount}/{data.todo.length} 完了</p>
        </Section>

        {/* メモ */}
        <Section title="📝 メモ">
          <ul className="space-y-1">
            {data.notes.map((n, i) => (
              <li key={i} className="text-xs text-gray-400">• {n}</li>
            ))}
          </ul>
        </Section>

        {/* Footer */}
        <div className="text-center text-[10px] text-gray-600 pb-8">
          Made with ❤️ by DriMac
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
