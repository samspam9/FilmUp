import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: '$backgroundColor',
  },
  contentContainer: {
    paddingHorizontal: '$screenPaddingHorizontal',
  },
  label: {
    fontFamily: '$fontFamily',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Styles;
