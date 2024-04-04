import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
//StAuth10244: I Henri Saing, 000132162 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookSentence, setBookSentence] = useState("");
  const [bookISBN, setBookISBN] = useState("");
  const [bookPub, setBookPub] = useState("");
  const [showTable, setTable] = useState(false);
  const [cover, setCover] = useState("");
  const [savedBooks, setSavedBooks] = useState([]);
  const [bookID, setBookID] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  // useEffect(fetchBooks, []);

  function fetchBooks(){
    fetch(`https://openlibrary.org/search.json?title=${search.replaceAll(' ','+')}`)
    .then(res=>res.json())
    .then((result)=>{
      setBooks(result.docs);
      console.log(result);
      console.log(books);
    });
  }

  function fetchCover(){
    // fetch(`https://covers.openlibrary.org/b/isbn/${bookISBN}-M.jpg`)
    // .then(res=>res.json())
    // .then((result)=>{
    //   setCover(result);
    // });
    
  }

  const searchChange = (event) =>{
    setSearch(event.target.value);
  }
  function updateSaved(id){
    setSavedBooks(savedBooks.concat(books[id]));
    setShowSaved(true);
  }

  function updateFromSaved(id){
    setBookAuthor(" not found");
    setBookTitle(" not found");
    setBookISBN(" not found");
    setBookSentence(" not found");
    setBookYear(" year not found");
    setBookPub(" not found");
    setCover(`https://covers.openlibrary.org/b/isbn/-M.jpg`);
    setShowSaved(true);
    if(savedBooks[id].hasOwnProperty("author_name")){
      setBookAuthor(savedBooks[id].author_name[0]);
    }
    if(savedBooks[id].hasOwnProperty("isbn")){
      setBookISBN(savedBooks[id].isbn[0]);
      setCover(`https://covers.openlibrary.org/b/isbn/${savedBooks[id].isbn[0]}-M.jpg`);
    }
    if(savedBooks[id].hasOwnProperty("first_sentence")){
      setBookSentence(savedBooks[id].first_sentence[0]);
    }
    if(savedBooks[id].hasOwnProperty("publish_year")){
      setBookYear(savedBooks[id].publish_year[0]);
    }
    if(savedBooks[id].hasOwnProperty("title")){
      setBookTitle(savedBooks[id].title);
    }
    if(savedBooks[id].hasOwnProperty("publisher")){
      setBookPub(savedBooks[id].publisher[0]);
    }
  }

  function updateDetails(id){
    setBookAuthor(" not found");
    setBookTitle(" not found");
    setBookISBN(" not found");
    setBookSentence(" not found");
    setBookYear(" year not found");
    setBookPub(" not found");
    setBookID(id);
    setTable(true);
    setShowSaved(false);
    setCover(`https://covers.openlibrary.org/b/isbn/-M.jpg`);
    if(books[id].hasOwnProperty("author_name")){
      setBookAuthor(books[id].author_name[0]);
    }
    if(books[id].hasOwnProperty("isbn")){
      setBookISBN(books[id].isbn[0]);
      setCover(`https://covers.openlibrary.org/b/isbn/${books[id].isbn[0]}-M.jpg`);
    }
    if(books[id].hasOwnProperty("first_sentence")){
      setBookSentence(books[id].first_sentence[0]);
    }
    if(books[id].hasOwnProperty("publish_year")){
      setBookYear(books[id].publish_year[0]);
    }
    if(books[id].hasOwnProperty("title")){
      setBookTitle(books[id].title);
    }
    if(books[id].hasOwnProperty("publisher")){
      setBookPub(books[id].publisher[0]);
    }
  
    // fetchCover();
    // fetchImage(`https://covers.openlibrary.org/b/isbn/${bookISBN}-M.jpg`);
    console.log(books[id]);
  }
  

  return (
    <View style={styles.container}>
      <Text>Welcome to Book Report!</Text>
      <br/>
        {showTable &&
        <div>
          <p style={styles.center}>
            <img src={cover} />
          </p>
        <table style={styles.table}>
          <tbody>
          <tr>
            <th>Title:</th>
            <td>{bookTitle}</td>
          </tr>
          <tr>
            <th>Author:</th>
            <td>{bookAuthor}</td>
          </tr>
          <tr>
            <th>Year:</th>
            <td>{bookYear}</td>
          </tr>
          <tr>
            <th>Publisher:</th>
            <td>{bookPub}</td>
          </tr>
          <tr>
            <th>ISBN:</th>
            <td>{bookISBN}</td>
          </tr>
          <tr>
            <th>First Sentence:</th>
            <td>{bookSentence}</td>
          </tr>
          {showSaved == false &&
          <tr>
            <th>Add to my books</th>
            <td>
              <button style={styles.fetchButton} onClick={()=>updateSaved(bookID)}>Save</button>  
            </td>
          </tr>
        }
          </tbody>
        </table>
        <br />
        </div>
}
      
      <input type='text' autoFocus="autofocus" style={styles.midWide} onChange={searchChange} />
      <button style={styles.fetchButton} onClick={fetchBooks}>Find Books</button>
      <ol>
        {savedBooks.map((book, id)=>(
        <li style={styles.hover} onClick={()=>updateFromSaved(id)}>{book.title}</li>
        ))}
      </ol>
      {/* <ul> */}
      <div style={styles.bookShelf}>
        {books.map((book, id) => (
          <div style={styles.bookStyle} onClick={()=>updateDetails(id)}>{book.title}</div>
        ))}
      </div>
      {/* </ul> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: "center",
  },
  hover:{
    cursor: "pointer",
  },
  table:{
    tableLayout: "fixed",
    width: "80%",
    border: "2px solid black",
    lineHeight: '22px',
    borderRadius: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  midWide:{
    width: "90%",
    textAlign: "center",
    borderStyle: "solid",
    borderBottomWidth: "4px",
    borderTopWidth: "0px",
    borderLeftWidth: "0px",
    borderRightWidth: "0px",
    borderColor: "black",
    outlineStyle: "none",
  },
  fetchButton:{
    backgroundColor: "white",
    border: "2px solid black",
    cursor: "pointer",
    borderRadius: "5px",
  },
  bookStyle:{
    cursor: "pointer",
    height: "180px",
    width: "120px",
    border: "2px solid black",
    display: "inline-block",
    float: "left",
    margin: "5px",
    padding: "10px",
    borderRadius: "10% 30% 30% 10%",
    overflow: "hidden",
    fontWeight: "bold",
    backgroundColor: "black",
    color: "white",
  },
  bookShelf:{
    justifyContent: 'left',
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default App;