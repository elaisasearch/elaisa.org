import React from 'react';
import {
  Text,
  Document,
  Page,
  StyleSheet,
  Image,
  View,
  PDFDownloadLink,
  Font
} from '@react-pdf/renderer';
import Header from './Header';
import Overview from './Overview';
import Experience from './Experience';
import logo from '../../../assets/img/logo.png';
import { makeStyles } from "@material-ui/styles"; 
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles({
  downloadbutton: {
      color: 'black',
      padding: isMobile ? '3%' : '0.7%',
      borderRadius: '5px',
      backgroundColor: 'rgb(217,217,217)',
      boxShadow: '1px 2px 5px grey',
      textDecoration: 'none',
      '&:hover': {
          backgroundColor: 'lightgrey'
      },
      marginTop: isMobile ? '10%' : null,
      marginBottom: isMobile ? '10%' : null  
  }
})

Font.register({
  family: 'Helvetica'
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

const Resume = props => {

  const { firstname, lastname, level, language } = props;

  return (
    <Document
      author="Elaisa Search Engine"
      keywords="Statistics, Analysis, Search History, Language Level"
      subject={`Elaisa Statistics from ${firstname} ${lastname}`}
      title={`Elaisa Statistics from ${firstname} ${lastname}`}
    >
      <Page orientation="landscape" size="A5" style={styles.page}>
        <Header firstname={firstname} lastname={lastname} />
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Image
              src={logo}
              style={styles.image}
            />
            <Overview />
          </View>
          <Experience level={level} language={language}/>
        </View>
        <Text style={styles.footer}>Elaisa - Language Level Search Engine - All rights reserved - 2020</Text>
      </Page>
    </Document>
  );
};

/**
 * The PDF Generator link to download file.
 * @param {object} props the given properties
 * @returns {JSX} PDF Download Link
*/
const PDFGenerator = (props) => {

  const { language, level, firstname, lastname } = props;

  const classes = useStyles();

  return <PDFDownloadLink className={classes.downloadbutton} document={<Resume language={language} level={level} firstname={firstname} lastname={lastname} />} fileName="elaisa_statistics.pdf">
    {({ blob, url, loading, error }) => (loading ? '...' : 'PDF Download')}
  </PDFDownloadLink>
}

export default PDFGenerator;

