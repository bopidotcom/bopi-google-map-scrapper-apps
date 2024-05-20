import { useEffect, useRef, useState } from "react";

function SerialKeyModal() {
const [sendingStatus, setSendingStatus] = useState<boolean>(false);
const [serialKey, setSerialKey] = useState<string>(null);

const [needActivation, setNeedActivation] = useState<boolean>(false);

const handleMainEvent = () => {
    window.license.registered(async (val: boolean) => {
        setNeedActivation(!val);
    });
}

const removeMainEvent = () => {
    window.license.removeEvents();
}

useEffect(() => {
    handleMainEvent();
    return () => {
        removeMainEvent();
    };
}, []);

useEffect(() => {
    if (needActivation) {
        setTimeout(() => {
            (document.querySelector('#serialKeyInput') as HTMLElement)?.focus()
        }, 500)
    } else {
    }
}, [
    needActivation
]);

return (
    <>
        { needActivation ? (
            <>
            <div className="h-full w-full bg-black opacity-60 antialiased overflow-hidden fixed top-0 left-0 z-[1000]"></div>
            <div id="default-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[1100] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative bg-white rounded shadow w-[256px]">
                    <div className="p-3">
                        <h3 className="text-dark text-lg text-center">Activation Your Serial Key</h3>
                        <p className={`text-sm`}>Silahkan Aktivasi Aplikasi WA Blast anda dahulu.</p>
                    </div>
                </div>
            </div>
            </>
        ) : null }
    </>
  )
}

export default SerialKeyModal