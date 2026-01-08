export default function Header({shown, setShown}) {
    return (
        <header className="header-block">
            <div className="header-block-left-part">
                <img
                    src="/images/favicon.png"
                    alt="Логотип"
                />
                <h1>Научно-техническая библиотека МГТУ им Н.Э. Баумана</h1>
            </div>
            <div className="header-block-right-part">
                {!shown && (
                    <div className="header-block-right-part-menu">
                        <button className="filed-button" onClick={() => {setShown(true); window.scrollTo(0,0);}}>Добавить читателя</button>
                    </div>
                )}
            </div>
        </header>
    );
}
