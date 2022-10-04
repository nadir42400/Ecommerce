export default function Modal({ setModalOn, clearCart }) {
    const handleOKClick = () => {
        setModalOn(false);
        clearCart();
    };
    const handleCancelClick = () => {
        setModalOn(false);
    };

    return (
        <div className="bg-zinc-600 opacity-90 fixed inset-0 z-40">
            <div className="flex h-screen justify-center items-center">
                <div className="flex-col justify-center items-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
                    <div className="text-lg text-zinc-600 mb-10">
                        Suppression de vos articles
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            onClick={handleOKClick}
                            className="rounded px-4 py-2 text-white font-medium bg-green-400 "
                        >
                            Oui
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="rounded px-4 py-2 ml-4 text-white font-medium bg-blue-500 "
                        >
                            Non
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
