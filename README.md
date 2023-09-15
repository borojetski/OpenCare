# OpenCare

![](https://github.com/borojetski/OpenCare/blob/main/loop.gif)

#

This is a collaborative tool and resource designed to assist individuals in caring for elderly, ill, or in-need loved ones. This project does not comply with HIPAA or other healthcare privacy and security regulations and is not intended for actual medical use. Users should refrain from entering personal health information. This app is provided "as-is" under the GPL 3.0 license.

This project is a work in progress. It is designed to assist caregivers with a set of tools to coordinate and manage caregiving tasks. It should not be relied upon as the sole repository for all patient medical data, but rather as a quick reference tool. The app includes the following features:

- **Google Calendar Integration:** Allows multiple users to coordinate and schedule events.

- **Medication Tracker:** Keep track of routine medications, to maintain as a quick reference.

- **Personal Medical Care Notes:** Jot down and access specific notes regarding personal medical care instructions.

- **Dietary Requirements/Personal Menu:** Record and manage dietary requirements and personalized menus.

- **Shopping List:** Create and manage a shopping list specifically tailored to the patient's needs.


## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies using `npm install`.

3. Configure your config/.env variables as shown below:

   DB_STRING = insert_mongodb_connection_string_here

   SESSION_SECRET = insert_random_string_here

   PORT = 3000

5. Start the application using `npm start`.

6. Access the application in your web browser at `http://localhost:3000`.


## Contact

For any questions, concerns, or input, please feel free to contact the author via contact@paulborowiecki.com.


## License

OpenCare is open source under the [GPL 3.0 license](https://www.gnu.org/licenses/gpl-3.0.en.html).
