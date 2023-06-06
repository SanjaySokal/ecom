import React from 'react'
import PageBanner from './PageBanner'
import AccountSidebar from './AccountSidebar'
import AccountsDetails from './AccountsDetails'

const Account = () => {
    return (
        <>
            <PageBanner name='My Account' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <AccountSidebar />
                        </div>
                        <div className="col-8">
                            <AccountsDetails />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Account
