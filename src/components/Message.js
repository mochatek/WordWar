export default function Message({
  listeners: [challenging, challenged_by, message],
  handlers: [cancelChallenge, acceptChallenge, rejectChallenge, closeMessage],
}) {
  if (challenging) {
    return (
      <section id="message">
        <p className="bold">Challenging {challenging}</p>
        <button className="button red" onClick={cancelChallenge}>
          Cancel
        </button>
      </section>
    );
  } else if (challenged_by) {
    return (
      <section id="message">
        <p className="bold">Challenge from {challenged_by}</p>
        <button className="button blue" onClick={acceptChallenge}>
          Accept
        </button>
        <button className="button red" onClick={rejectChallenge}>
          Reject
        </button>
      </section>
    );
  } else if (message) {
    return (
      <section id="message">
        <p className="bold">{message}</p>
        <button className="red" onClick={closeMessage}>
          X
        </button>
      </section>
    );
  }

  return null;
}
