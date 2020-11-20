import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    marginTop: 32,
    marginBottom: 56,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: '#555555',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 80,
  },
  form: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    paddingLeft: 16,
    paddingRight: 16,
  },
  formLabel: {
    marginBottom: 8,
    paddingLeft: 4,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 64,
  },
  button: {
    width: '100%',
  },
});

export default styles;
