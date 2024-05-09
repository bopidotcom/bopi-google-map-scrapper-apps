import LogoBopi from '../img/logo-bopi.png';
import SiBopi from '../img/si-bopi.png';
import TutorialIcon from '../img/tutorial-icon.png';
import SupportIcon from '../img/support-icon.png';

const openBrowser = (url: string) => {
  window.api.openDefaultBrowser({
    url
  });
}

function Nav() {
  return (
    <div id="nav" className={`bg-light select-none`}>
      {/* <div className={`grid grid-cols-3 gap-2`}> */}
      <div className={`flex`}>
        <div>
          <img className={`nav-si-bopi-text`} width={132} src={ LogoBopi } alt="" />
        </div>
        <div className={`m-auto`}>
          <img className={`nav-si-bopi-logo`} width={106} src={ SiBopi } alt="" />
        </div>
        <div>
          <div className={`name-version`}>
            <h3 className={`text-dark font-bold mb-0 text-right`}>Supplier Finder</h3>
            <p className={`text-sm mb-2 mt-0 text-right version-text`}>version 1.0</p>
            <div className={`grid grid-cols-2 gap-1`}>
              <div>
                <button onClick={() => openBrowser('https://botpintar.com/tutorial')} type={`button`} className={`flex bg-dark text-light font-bold w-full items-center justify-center rounded btn-helper p-0.5`}><img width={13} src={ TutorialIcon } alt="" />&nbsp;Tutorial</button>
              </div>
              <div>
                <button onClick={() => openBrowser('https://botpintar.com/report')} type={`button`} className={`flex bg-dark text-light font-bold w-full items-center justify-center rounded btn-helper p-0.5`}><img width={13} src={ SupportIcon } alt="" />&nbsp;Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav