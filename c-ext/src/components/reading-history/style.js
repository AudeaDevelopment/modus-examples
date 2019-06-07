export default {
  container: {
    height: '72px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #C4C4C4',
    alignItems: 'center',
  },
  sourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #0F71D9',
    width: '66px',
  },
  barContainer: {
    display: 'flex',
    height: '80%',
    width: '122px',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '8px',
  },
  topBar: {
    height: '22px',
    backgroundColor: '#0F71D9',
    border: '1px solid #0F71D9',
  },
  bottomBar: {
    height: '22px',
    backgroundColor: '#BACCDE',
    border: '1px solid #0F71D9',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  numContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  num1: { borderBottom: '1px solid #0F71D9' },
  num2: { borderTop: '1px solid #0F71D9', textAlign: 'left' },
};
