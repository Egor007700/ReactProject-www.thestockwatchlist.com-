import Tabs from '@material-ui/core/Tabs';
import { makeStyles, withStyles } from '@material-ui/styles';
const AntTabs = withStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '31px'
    },
    indicator: {
      backgroundColor: '#337dff',
    },
  })(Tabs);

  export default AntTabs;