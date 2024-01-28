import { ADD_PORTFOLIO } from '@/utils/constants';
import React, { useState } from 'react';
import axios from 'axios';

const AddPortfolio = () => {
  const [cvFile, setCvFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const handleSubmit = async () => {
    if (!cvFile || !coverPhoto || !about || !skills) {
      setErrorMessage('Please fill in all fields and upload required files.');
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('cvFile', cvFile);
      formData.append('coverPhoto', coverPhoto);
      formData.append('about', about);
      formData.append('skills', skills);

      const response = await axios.post(ADD_PORTFOLIO, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setErrorMessage('');
      } else {
        throw new Error('Failed to store portfolio');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClassName =
    'block p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500';

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] gap-10 dark:bg-gray-800 dark:text-gray-200">
      <h2 className="text-3xl pt-8">Create Portfolio</h2>

      <div className="flex flex-col items-center w-full gap-5">
        <div className="flex gap-5">
          <div>
            <label className="mb-2 text-lg font-medium text-gray-800" htmlFor="cvFile">
              Upload your CV
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvFileChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-2 text-lg font-medium text-gray-800" htmlFor="coverPhoto">
              Upload Cover Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverPhotoChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-col w-[600px]">
          <label className="mb-2 text-lg font-medium text-gray-800" htmlFor="about">
            About Section
          </label>
          <textarea
            name="about"
            id="about"
            value={about}
            onChange={handleAboutChange}
            className={inputClassName}
            placeholder="Write a brief description about yourself..."
            rows={6} // Set the number of rows to adjust the height
          ></textarea>
        </div>

        <div>
          <label className="mb-2 text-lg font-medium text-gray-800" htmlFor="skills">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            value={skills}
            onChange={handleSkillsChange}
            placeholder="Web Development, Design, SEO, ..."
            className={inputClassName}
            style={{ width: '600px' }} // Adjust the width as needed
          />
        </div>

        {errorMessage && (
          <div>
            <span className="text-red-600 font-bold">{errorMessage}</span>
          </div>
        )}

        <button
          className="border text-lg font-semibold px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-md dark:text-gray-200 dark:bg-sky-800 hover:dark:bg-sky-600"
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Portfolio'}
        </button>
      </div>
    </div>
  );
};

export default AddPortfolio;
