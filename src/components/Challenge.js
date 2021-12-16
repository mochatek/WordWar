export default function Challenge({ opponent, confirm, deselect }) {
  return (
    <div className="modalDialog">
      <div>
        <h3>Wanna challenge {opponent} ?</h3>

        <div className="flex even">
          <button className="button bg-green round" onClick={confirm}>
            <i className="fa fa-thumbs-up"></i>
          </button>
          <button className="button bg-red round" onClick={deselect}>
            <i className="fa fa-thumbs-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
