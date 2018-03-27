import Overview from './Overview';
import ComfirmCollection from './ComfirmCollection';
import Collection from './Collection';
import InvalidPage from './invalidPage';
import ScanReceipt from './ScanReceipt';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';

const vendorStack = StackNavigator({
    Overview: {
        screen: Overview,
        navigationOptions: {
            title: 'RECEIPT SCANNER'
        }
    },
    ScanReceipt: {
        screen: ScanReceipt,
        navigationOptions: {
            title: 'SCAN RECEIPT'
        }
    },
    ComfirmCollection: {
        screen: ComfirmCollection,
        navigationOptions: {
            title: 'CONFIRM COLLECTION'
        }
    },
    Collection: {
        screen: Collection,
        navigationOptions: {
            title: 'COLLECTION'
        }
    },
    InvalidPage: {
        screen: InvalidPage,
        navigationOptions: {
            title: 'INVALID RECEIPT'
        }
    }
}, {
        navigationOptions: {
            header: null
        },
        initialRouteName: 'Overview'
    })


export default vendorStack;