const messages = [
  {
    from: "sathi",
    text: "Aapka parcel abhi out for delivery hai. Koi ghar pe hoga?",
  },
  {
    from: "buyer",
    text: "Aaj ghar pe koi nahi, kal shaam aa jao",
  },
  {
    from: "sathi",
    text: "Theek hai — kal shaam ke liye reschedule kar diya. Kitne baje theek rahega?",
  },
  {
    from: "system",
    text: "Back to you · reschedule booked",
  },
] as const;

export function ChatPreview() {
  return (
    <div className="chat-stage relative mx-auto w-full max-w-md">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,var(--wash),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(240,90,40,0.18),transparent_45%)]"
      />
      <div className="overflow-hidden rounded-[1.75rem] border border-line bg-brand-deep shadow-[0_28px_60px_-28px_rgba(6,53,50,0.65)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <span className="grid size-9 place-items-center rounded-full bg-signal font-display text-sm font-semibold text-white">
            DS
          </span>
          <div>
            <p className="text-sm font-medium text-white">Delivery Sathi</p>
            <p className="text-xs text-white/65">
              Talking to your buyer · Hinglish
            </p>
          </div>
        </div>
        <div className="space-y-3 bg-[linear-gradient(180deg,#0a4f4a_0%,#063532_100%)] px-4 py-5">
          {messages.map((message) => {
            if (message.from === "system") {
              return (
                <p
                  key={message.text}
                  className="chat-bubble mx-auto max-w-[92%] rounded-full bg-white/10 px-3 py-1.5 text-center text-[0.7rem] tracking-wide text-white/80"
                >
                  {message.text}
                </p>
              );
            }

            const isBuyer = message.from === "buyer";

            return (
              <div
                key={message.text}
                className={`chat-bubble flex ${isBuyer ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    isBuyer
                      ? "rounded-br-md bg-chat-buyer text-brand-deep"
                      : "rounded-bl-md bg-surface text-foreground"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
