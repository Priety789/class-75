import React from 'react';
import { StyleSheet, Text, View, Item, SafeAreaView, FlatList, StatusBar} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            searchedStory: "",
			scannedStoryId: "",
        };
    }
    updateSearchedStory = (searchedStory) => {
        this.setState({searchedStory})
    }
    retrieveStories = () => {
        var allStories = db.collection("stories")
        var query = allStories.where("story", "==", true);
        db.collection("stories").where("story", "==", true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting story: ", error);
            });

    };
    searchFilter = async () => {
		const allStories = await db
		  .collection("dataSource")
		  .where("storyId", "==", this.state.scannedStoryId)
		  .get();
		var transactionType = "";
		if (allStories.docs.length == 0) {
		  transactionType = false;
		} else {
		  allStories.docs.map(doc => {
			var story = doc.data();
			if (story.storyAvailability) {
			  transactionType = "Issue";
			} else {
			  transactionType = "Return";
			}
		});
		}
		return transactionType;
    }
    const DATA = [
        {
          id: 'stories',
          title: 'story',
        }
    ];
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );
    const App = () => {
        const renderItem = ({ item }) => (
          <Item title={item.title} />
    );
    render() {
        const { searchedStory } = this.state;
        return (
            <View style={styles.inputView}>
                <SearchBar
                    placeholder="Search Stories"
                    onChangeText={this.updateSearchedStory}
                    value={searchedStory}
                />
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: "row",
        margin: 20
    }
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
})