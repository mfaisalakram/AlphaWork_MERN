import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/actions/auth";
import { createProfile, getUserProfile } from "../../store/actions/profile";
import { withRouter } from "react-router-dom";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history
}) => {
  const [formData, setformData] = useState({
    company: "",
    website: "",
    location: "",
    bio: "",
    status: "",
    githubusername: "",
    skills: "",
    youtube: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  });

  const [disSocialInputs, toggleInputs] = useState(false);
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = formData;

  useEffect(() => {
    getUserProfile();
   if(profile.social){
    setformData({
      company: !profile.company ? "" : profile.company,
      website: !profile.website ? "" : profile.website,
      location: !profile.location ? "" : profile.location,
      bio: !profile.bio ? "" : profile.bio,
      status: !profile.status ? "" : profile.status,
      githubusername: !profile.githubusername ? "" : profile.githubusername,
      skills: !profile.skills ? "" : profile.skills.join(","),
      youtube:  !profile.social.youtube ? "" : profile.social.youtube,
      facebook: !profile.social.facebook ? "" : profile.social.facebook,
      twitter: !profile.social.twitter ? "" : profile.social.twitter,
      instagram: !profile.social.instagram ? "" : profile.social.instagram,
      linkedin: !profile.social.linkedin ? "" : profile.social.linkedin
    });  
   }else{
    setformData({ 
      company: !profile.company ? "" : profile.company,
      website: !profile.website ? "" : profile.website,
      location: !profile.location ? "" : profile.location,
      bio: !profile.bio ? "" : profile.bio,
      status: !profile.status ? "" : profile.status,
      githubusername: !profile.githubusername ? "" : profile.githubusername,
      skills: !profile.skills ? "" : profile.skills.join(","),
      youtube:"",
      facebook: "" ,
      twitter: "",
      instagram:"",
      linkedin: ""
   })
  }
   
  }, []);

  
  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    console.log(formData);
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={e => onChange(e)}
            name="company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            value={website}
            onChange={e => onChange(e)}
            name="website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => onChange(e)}
            name="location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            value={skills}
            onChange={e => onChange(e)}
            name="skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            value={githubusername}
            onChange={e => onChange(e)}
            name="githubusername"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            value={bio}
            onChange={e => onChange(e)}
            name="bio"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            onClick={() => toggleInputs(!disSocialInputs)}
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {disSocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={e => onChange(e)}
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebook}
                onChange={e => onChange(e)}
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                onChange={e => onChange(e)}
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                onChange={e => onChange(e)}
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                onChange={e => onChange(e)}
                name="instagram"
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getUserProfile })(
  withRouter(EditProfile)
);
