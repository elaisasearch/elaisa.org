import React from 'react';

import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
});

const ExperienceEntry = ({ company, details, date }) => {
  const title = `${company}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <List>
        {details.map((detail, i) => (
          <Item key={i} style={styles.detailContainer}>
            {detail}
          </Item>
        ))}
      </List>
    </View>
  );
};

const Experience = (props) => {

  const { level, language } = props;

  const historyData = [
    {
      company: 'Language Level',
      date: 'Times searched',
      details: [
        `All: ${level.all}`,
        `A1: ${level.a1}`,
        `A2: ${level.a2}`,
        `B1: ${level.b1}`,
        `A2: ${level.b2}`,
        `C1: ${level.c1}`,
        `A2: ${level.c2}`,
      ]
    },
    {
      company: 'Language',
      date: 'Times searched',
      details: [
        `Deutsh: ${language.de}`,
        `English: ${language.en}`,
        `Español: ${language.es}`
      ]
    },
    
  ];

  return (<View style={styles.container}>
    <Title>Search History</Title>
    {historyData.map(({ company, date, details, position }) => (
      <ExperienceEntry
        company={company}
        date={date}
        details={details}
        key={company + position}
        position={position}
      />
    ))}
  </View>
  );
};

export default Experience;
