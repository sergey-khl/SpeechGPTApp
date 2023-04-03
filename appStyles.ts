import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    height:100,
    borderRadius: 50,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  textStyle: {
    textAlign: 'center',
    padding: 12,
    color: '#f0f',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default styles