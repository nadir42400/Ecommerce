import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <Topbar />
      <div className="sideBar">
        <Sidebar />
      </div>
      <div className="core">
      <h1 className="newUserTitle">Nouvel Utilisateur</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Pseudo</label>
          <input type="text" placeholder="JC42" />
        </div>
        <div className="newUserItem">
          <label>Nom complet</label>
          <input type="text" placeholder="Jean Celestin" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="test@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mot de passe</label>
          <input type="password" placeholder="Mot de passe" />
        </div>
        <div className="newUserItem">
          <label>Téléphone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Addresse</label>
          <input type="text" placeholder="Tokyo | JPN" />
        </div>
        <div className="newUserItem">
          <label>Genre</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Homme</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Femme</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Autre</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
        <button className="newUserButton">Créer</button>
      </form>
      </div>
    </div>
  );
}