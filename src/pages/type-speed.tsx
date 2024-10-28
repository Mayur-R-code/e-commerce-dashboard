import React from 'react'
import { Helmet } from 'react-helmet-async'

import TypingSpeedCheck from 'src/sections/type-speed'

const TypeSpeed = () => (
        <>
            <Helmet>
                <title>
                    Type-Speed
                </title>
            </Helmet>
            <TypingSpeedCheck />
        </>
    )
export default TypeSpeed