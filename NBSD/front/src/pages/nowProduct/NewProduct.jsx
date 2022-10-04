import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCall";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [ inputs, setInputs ] = useState({})
  const [ file, setFile ] = useState(null)
  const [ cat, setCat ] = useState([])
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }
  const handleCat = (e) => {
    setCat(e.target.value.split(","))
  }
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = ({ ...inputs, image: downloadURL, categories: cat });
          addProduct(product, dispatch)
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <Topbar />
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="core">
      <h1 className="addProductTitle">Ajouter un Produit</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input 
            name="image" 
            type="file" 
            id="file" 
            onChange={e => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Nom</label>
          <input name="full_name" type="text" placeholder="Seagate BarraCuda 1 To" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Details</label>
          <input name="details" type="textarea" placeholder="all details ..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Prix</label>
          <input name="price" type="text" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input name="stock" type="number" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Marque</label>
          <input name="marque" type="text" placeholder="Seagate" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Disque Dur" onChange={handleCat}/>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
      </div>
    </div>
  );
}