import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    Image
} from "@react-pdf/renderer";
import '../../assets/css/PDFGeneratorStyle.css'
import logo from '../../assets/img/logo.png';


const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
    },
    section: {
        alginItems: "center",
        flexDirection: "column"
    },
    image: {
        width: "25%",
        marginTop: "5%",
        marginLeft: "5%"
    },
    content: {
        marginTop: "5%"
    }
});

/**
 * The PDF Document for export.
 * @param {object} props the given properties
 * @returns {JSX} PDF document
*/
const MyDocument = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image style={styles.image} src={logo} />
                <Text>Elaisa Statistics</Text>
            </View>
            <View style={styles.content}>
                <Text>
                    <Text>Name: {props.firstname} {props.lastname} </Text>
                    <Text>Date: {new Date().toLocaleDateString()}</Text>
                </Text>
            </View>
            <View style={styles.section}>
                <Text>Language: {JSON.stringify(props.language)}</Text>
                <Text>Level: {JSON.stringify(props.level)}</Text>
            </View>
        </Page>
    </Document>
);

/**
 * The PDF Generator link to download file.
 * @param {object} props the given properties
 * @returns {JSX} PDF Download Link
*/
const PDFGenerator = (props) => {

    console.log(new Date().toLocaleDateString)


    const { language, level, firstname, lastname } = props;

    return <PDFDownloadLink className="downloadbutton" document={<MyDocument language={language} level={level} fistname={firstname} lastname={lastname}/>} fileName="elaisa_statistics.pdf">
    {({ blob, url, loading, error }) => (loading ? 'LOADING DOCUMENT...' : 'GENERATE PDF')}
</PDFDownloadLink>
}

export default PDFGenerator;