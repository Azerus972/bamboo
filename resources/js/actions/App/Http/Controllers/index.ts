import DashboardController from './DashboardController'
import VideoController from './VideoController'
import BillingController from './BillingController'
import StripeWebhookController from './StripeWebhookController'
import Admin from './Admin'
import Teams from './Teams'
import Settings from './Settings'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    VideoController: Object.assign(VideoController, VideoController),
    BillingController: Object.assign(BillingController, BillingController),
    StripeWebhookController: Object.assign(StripeWebhookController, StripeWebhookController),
    Admin: Object.assign(Admin, Admin),
    Teams: Object.assign(Teams, Teams),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers