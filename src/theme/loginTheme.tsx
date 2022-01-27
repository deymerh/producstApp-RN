import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  fonmContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  label: {
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  inputField: {
    color: 'white',
    fontSize: 20
  },
  inputFiledIOS: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    padding: 5
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  button: {
    borderWidth: 1.5,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100
  },
  buttonText: {
    fontSize: 20,
    color: 'white'
  },
  btnNewUserContainer: {
    alignItems: 'flex-end',
    marginTop: 20
  },
  buttonNewUserText: {
    textDecorationLine: 'underline',
    color: 'white'
  }
})