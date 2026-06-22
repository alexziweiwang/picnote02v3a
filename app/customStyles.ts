
import { StyleSheet } from "react-native";

export default StyleSheet.create({


titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
},

headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
},

stepContainer: {
    gap: 8,
    marginBottom: 8,
},

reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
},

container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
},

link1: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,

},

header: {
    overflow: 'hidden',
},

content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
},

default: {
    fontSize: 16,
    lineHeight: 24,
},

defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
},

title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
},

subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
},

link2: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
},

heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
},

content2: {
    marginTop: 6,
    marginLeft: 24,
},

overlay: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
},

inputFrame: {
    height: 30,
    borderWidth: 2,
    borderColor: 'pink',
},

thickFrame:{
    paddingTop: 100, 
    paddingLeft: 20, 
    paddingRight: 20, 
    paddingBottom: 20
}

}
);