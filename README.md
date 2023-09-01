# OpenCare

This is a collaborative tool and resource designed to assist individuals in caring for elderly, ill, or in-need loved ones. This project does not comply with HIPAA or other healthcare privacy and security regulations and is not intended for actual medical use. Users should refrain from entering personal health information. The app is provided "as-is" under the GPL 3.0 license.

## Purpose

The purpose of this project is to provide caregivers with a comprehensive set of tools to coordinate and manage caregiving tasks effectively. The app includes the following features:

- **Google Calendar Integration:** Allows multiple users to coordinate and schedule events, ensuring everyone involved is aware of important appointments and activities.

- **Medication Tracker:** Enables caregivers to keep track of routine medications, to maintain as a reference, and minimize the risk of errors.

- **Personal Medical Care Notes:** Allows caregivers to jot down and access specific notes regarding personal medical care instructions.

- **Dietary Requirements/Personal Menu:** Offers a platform to record and manage dietary requirements and personalized menus, helping caregivers create appropriate meal ideas and plans.

- **Shopping List:** Provides a platform for creating and managing a shopping list specifically tailored to the patient's needs.

## Disclaimer

Please note the following disclaimers regarding the OpenCare web app:

- **Not Intended for Actual Medical Use:** This web app is meant for demonstration purposes only and is not intended for actual medical use. It is crucial not to enter any personal health information into the application.

- **Non-Compliance with HIPAA and Healthcare Regulations:** The OpenCare web app does not comply with HIPAA or any other healthcare privacy and security regulations. 

- **No Guarantees of Privacy or Security:** The author of the OpenCare does not provide any guarantees regarding privacy or security. Great effort was made to protect user and patient privacy, however it has not been audited and is not suitable for handling sensitive medical data. Users must understand the inherent risks when using the application and take necessary precautions.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies using `npm install`.

3. Configure your config/.env variables as shown below:
    DB_STRING = insert_mongodb_connection_string_here
    SESSION_SECRET = insert_random_string_here
    PORT = 3000

4. Start the application using `npm start`.

5. Access the application in your web browser at `http://localhost:3000`.

## Contact

For any questions, concerns, or input related to OpenCare, please feel free to contact the author via contact@paulborowiecki.com.

## License

OpenCare is open source under the [GPL 3.0 license](https://www.gnu.org/licenses/gpl-3.0.en.html).