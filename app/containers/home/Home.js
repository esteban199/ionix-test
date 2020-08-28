import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDollarSign, faWallet, faMapMarkedAlt, faTag, faEnvelope, faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import bgImage from "../../assets/bg-image.png";
import { TRANSPARENT_WHITE } from '../../utils/colors';
import Dialog, { SlideAnimation } from 'react-native-popup-dialog';
import { encrypt } from '../../utils/encrypt';
import axios from 'axios';

class Home extends React.Component {

  state = {
    modalIsOpen: false,
    modalLoading: false,
    dni: "",
    user: null
  }

  toggleMenu = () => this.setState({ modalIsOpen: !this.state.modalIsOpen })

  saveDni = () => {
    const { dni } = this.state;
    if (dni) {
      this.setState({ modalLoading: true }, async () => {
        try {
          const encryptedDni = encrypt(dni)
          console.log("encryptedDni: ", encryptedDni)
          const url = `https://sandbox.ionix.cl/test-tecnico/search?rut=${encryptedDni}`
          console.log("post url: ", url)
          const response = await axios.get(url)
          console.log("response: ", response)
          if (response.data &&
            response.data.result &&
            response.data.result.items &&
            response.data.result.items.length >= 1) {
            const user = response.data.result.items[1]
            this.setState({ user })
            this.toggleMenu()
            Alert.alert(
              "Contacto",
              `${user.details.phone_number}, ${user.details.email}`,
              [
                {
                  text: "Ok",
                  onPress: () => null,
                  style: 'cancel',
                }
              ],
              { cancelable: false }
            );
            this.setState({ modalLoading: false })
          } else {
            alert("No se encontraron usuarios.")
            this.setState({ modalLoading: false })
          }
        } catch (e) {
          console.log("saveDni / error: ", e)
          alert("Error de conexión, intente mas tarde.")
          this.setState({ modalLoading: false })
        }
      })
    } else {
      alert("Registra tu DNI por favor.")
    }
  }

  saveUser = async () => {
    const { user } = this.state;
    if (user) {
      try {
        const response = await axios.post(fullUrl, user, {
          headers: {
            'content-type': 'application/json',
            'accept-language': language,
            'access-token': isAuth ? token : '',

          }
        })
        console.log("saveUser / response: ", response);
        Alert.alert(
          "Usuario creado.",
          `Id del usuario: ${response.userId}`,
          [
            {
              text: "Ok",
              onPress: () => null,
              style: 'cancel',
            }
          ],
          { cancelable: false }
        );
      } catch (e) {
        alert("Error de conexión, intente mas tarde.")
      }
    } else {
      Alert.alert(
        "Necesitas registrar tu DNI primero.",
        ``,
        [
          {
            text: "Ok",
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: "Registrar DNI",
            onPress: () => this.toggleMenu(),
            style: 'cancel',
          }
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const { modalIsOpen, dni, modalLoading } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.imageBackgroundContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => this.toggleMenu()} style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faDollarSign} style={styles.icon} />
              <Text style={styles.buttonTitle}>Pagar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.saveUser()} style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faWallet} style={styles.icon} />
              <Text style={styles.buttonTitle}>Billetera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.icon} />
              <Text style={styles.buttonTitle}>Estaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faTag} style={styles.icon} />
              <Text style={styles.buttonTitle}>Beneficios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
              <Text style={styles.buttonTitle}>Mensajes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <FontAwesomeIcon icon={faCog} style={styles.icon} />
              <Text style={styles.buttonTitle}>Configuración</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Dialog
          onTouchOutside={() => !modalLoading ? this.toggleMenu() : null}
          onHardwareBackPress={() => !modalLoading ? this.toggleMenu() : null}
          visible={modalIsOpen}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'top',
          })}
        >
          <View style={styles.modalContainer}>
            {modalLoading
              ? <ActivityIndicator size="large" color="black" />
              : <>
                <TouchableOpacity onPress={() => this.toggleMenu()} style={styles.closeIcon}>
                  <FontAwesomeIcon icon={faTimes} size={32} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Registrar DNI</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({ dni: text })}
                  disabled={modalLoading}
                  placeholder="DNI"
                  value={dni}
                />
                <Button
                  onPress={this.saveDni}
                  title="Continuar"
                  color="black"
                  accessibilityLabel="Continuar"
                />
              </>
            }
          </View>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  imageBackgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
  icon: {
    color: 'black'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 100,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    backgroundColor: TRANSPARENT_WHITE,
    alignItems: 'center',
    margin: 5,
  },
  buttonTitle: {
    color: 'black'
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalContainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TRANSPARENT_WHITE
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
});

export default Home;