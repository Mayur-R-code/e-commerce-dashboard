import React from 'react'
import { Helmet } from 'react-helmet-async'

import NotificationsView from 'src/sections/notification'

const Notification = () => (
        <>
            <Helmet>
                <title>
                    Notification
                </title>
            </Helmet>
            <NotificationsView />
        </>
    )
export default Notification