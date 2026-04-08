import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const PasswordStrength = ({ password }) => {
  const passwordCriteria = [
    {
      label: 'At least 8 characters long.',
      met: password.length >= 8,
    },
    {
      label: 'Contains a lowercase letter.',
      met: /[a-z]/.test(password),
    },
    {
      label: 'Contains an uppercase letter.',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'Contains a special character.',
      met: /[\W_]/.test(password),
    },
    {
      label: 'Contains at least one number.',
      met: /[0-9]/.test(password),
    },
  ];

  return (
    <div className="flex justify-center mt-4">
      <div className="">
        {passwordCriteria.map((criteria) => (
          <div key={criteria.label} className="flex items-center space-x-2">
            <FontAwesomeIcon
              icon={criteria.met ? faCheck : faXmark}
              className={criteria.met ? 'text-blue-500' : 'text-red-500'}
            />
            <span className={criteria.met ? 'text-gray-700' : 'text-gray-400'}>
              {criteria.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
