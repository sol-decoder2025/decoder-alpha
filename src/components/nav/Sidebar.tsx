import { css } from "@emotion/react";
import {IonButton, IonIcon, IonList, IonMenuToggle, IonContent, useIonToast, IonModal, IonHeader, IonToolbar } from "@ionic/react"
import {
    bookOutline,
    calendarClearOutline,
    close,
    homeOutline,
    logoTwitter,
    notificationsOutline,
    searchOutline,
    statsChartOutline,
    skullOutline, earthOutline,
    serverOutline,
    diamondOutline, logoDiscord, todayOutline, calendarOutline

} from "ionicons/icons"
import NavLink from "./NavLink"
import WalletButton from '../WalletButton';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { auth } from "../../firebase";
import { VERSION_CODE } from '../../environments/environment'
import { useState,useEffect } from "react";
import './Sidebar.css'
import { isEditWhitelist } from "../../redux/slices/whitelistSlice";



function Sidebar() {
	const isDemo = useSelector<RootState>(state => state.demo.demo);
	const role:any = useSelector<RootState>(state => state.demo.role);
    const [isMobile,setIsMobile] = useState(false)
    const isLogin = localStorage.getItem('isLogin')
    const [logoutPopupOpen, setLogoutPopupOpen] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.innerWidth < 525){
            setIsMobile(true)
        }
    }, [window.innerWidth])

    const logOutHandler = () => {
		auth.signOut()
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <>
        <IonContent>
            <div className={`px-2 ${isMobile ? '' :'h-full'}`}>
            <IonList
                lines="none"
                className={`px-2 h-full overflow-auto ${isMobile ? '' : 'border-r'} md:max-w-max lg:max-w-none`}
                css={css`
                    border-color: var(--ion-color-step-150);
                `}
            >
                {isDemo && (
                   <IonMenuToggle menu="sidebar">
                   	 <IonButton
	                        color="primary"
							fill="outline"
	                        hidden={!isDemo}
	                        className="relative sm:hidden flex  space-x-1 hover:opacity-90 items-center"
	                        onClick={(e) => {
	                            auth.signOut();
	                        }}
							size="default"
							css={css`
								--vertical-padding: 20px;
								--padding-bottom: var(--vertical-padding);
								--padding-top: var(--vertical-padding);
							`}
	                    >
	                        <p className="text-white">demo</p>
	                        <IonIcon className="text-white" icon={close} />
	                    </IonButton>
                   </IonMenuToggle>
                )}

                {/*<NavLink title="Home" icon={homeOutline} to="/" />*/}
                {/* @ts-ignore */}
                <div onClick={()=> dispatch(isEditWhitelist(false))}>
                    <NavLink
                        title="Seamless"
                        icon={diamondOutline}
                        to="/seamless"
                        needsRole={false}
                    />
                </div>

                <NavLink
                    title="Add Bots / Seamless"
                    icon={serverOutline}
                    to="/dao"
                    needsRole={false}
                />

                <NavLink
                    title="Today's Mints"
                    icon={todayOutline}
                    to="/schedule"
                />

                <NavLink
                    title="Mint Calendar"
                    icon={calendarOutline}
                    to="/calendar"
                />

                <NavLink
                    title="Fox Token Market"
                    icon="/assets/icons/FoxTokenLogo.svg"
                    to="/foxtoken"
                    isIconSvg={true}
                />
                <NavLink
                    title="Mint Stats"
                    icon={statsChartOutline}
                    to="/mintstats"
                />
                <NavLink
                    title="Stacked Line Search"
                    icon={searchOutline}
                    to="/stackedsearch"
                />

                {/*<NavLink*/}
                {/*    title="Alerts"*/}
                {/*    icon={notificationsOutline}*/}
                {/*    to="/alerts"*/}
                {/*/>*/}

                <NavLink
                    title="Docs"
                    icon={bookOutline}
                    to="#"
                    external={'https://docs.soldecoder.app'}
                    needsRole={false}
                />

                <NavLink
                    title="Contact / Discord"
                    icon={logoDiscord}
                    to="#"
                    external={'https://discord.com/invite/sol-decoder'}
                    needsRole={false}
                />

                {/*<NavLink*/}
                {/*    title="Twitter"*/}
                {/*    icon={logoTwitter}*/}
                {/*    to="#"*/}
                {/*    external={'https://twitter.com/SOL_Decoder'}*/}
                {/*/>*/}

                {/* logout Button  */}
                {/*{isLogin === 'isLogin' ? */}
                    <div>
                        <span onClick={() => setLogoutPopupOpen(true)} color="primary" className="px-2 mx-0 w-full"> Logout </span>
                    </div>
                {/*: '' }*/}


                {/* hide wallet button in mobile so don't comment out */}
                {/* <div className="xl:hidden lg:hidden md:hidden">
                    <WalletButton />
                </div> */}
               <div className="text-center mt-4 text-white-500">Version <b>{VERSION_CODE}</b></div>

            </IonList>
            </div>
            </IonContent>

            <IonModal isOpen={logoutPopupOpen} onDidDismiss={() => setLogoutPopupOpen(false)} cssClass={isMobile ? 'logout-modal-mobile' :'logout-modal-web'} >
                <IonContent className="flex items-center" scroll-y="false">
                    <div className='text-xl font-bold text-center w-full mt-5'>
                        Logout?
                    </div>
                    <div className=' text-center w-full mt-8'>
                        Are you sure want to Logout of Discord?
                    </div>
                    <div className="flex flex-row mt-10">
                        <IonButton onClick={() => logOutHandler()} color="primary" className="px-2 mx-0 w-full"> Logout </IonButton>
                        <IonButton onClick={() => setLogoutPopupOpen(false)} color="medium" className="px-2 mx-0 w-full"> Cancel </IonButton>
                    </div>
                </IonContent>
            </IonModal>
        </>
    );
}

export default Sidebar

