# Library Information System (LIS)

This project is aimed at automating the processes of a library and faciliating user transactions like issue, reserve or return books. Users also have the facility to make requests for procuring new books or reporting a book not in shelf. They are also sent notifications based on their pending books or books which have been reserved for them. We have also introduced user book recommendations, a unique feature that suggests books for users to issue next based on their preferences.

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. On a new terminal, prepare the backend of the project for running using these commands in their respective order:
                                `python3 manage.py makemigrations`
                                `python3 manage.py migrate`
4. To create a super user for administrative access, run the following command:
                                `python3 manage.py createsuperuser`
    and enter your details as prompted. You may also want to create a sample database with a certain number of books with arbitrary names, for that run:
                                `python3 manage.py shell`
                                `from api.factory import BookFactory`
                                `from BookFactory.create_batch(1000)`
    The batch size can be adjusted and entered as per requirement
5. Finally start the backend server using command:
                                `python3 manage.py runserver`
    NOTE: All these commands were written assuming the availability of python3 in the user's device. In case of earlier versions being installed, replace `python3` with `python` in the above commands.
6. Open another new terminal simultaneously, and type in `cd frontend`
7. Start the app with the command `npm start`

## Contributing

We welcome contributions from the community. If you'd like to contribute, please follow these guidelines:
- Fork the repository.
- Create a new branch.
- Make your changes and submit a pull request.

## Credits

- This project has been made as a part of the Software Engineering Laboratory Course Project (CS29006), Spring 2024, IIT Kharagpur, under the supervision of Prof. Sourangshu Bhattacharya and Prof. Debasis Samanta. We thank our professors for giving us such a wonderful opportunity to learn through this project.
- Efforts for this project were put in by our team CodeGirls. We are Gayathri Anant(22CS30026), Pracheta Saha(22CS30042) and Ankita Mishra(22CS10010), second year undergraduate students from the Department of Computer Science and Engineering in Indian Institute of Technology, Kharagpur.

## Contact

If you have any questions or feedback, feel free to reach out to Gayathri Anant: gayathrianant05@gmail.com, Pracheta Saha: prachetacs42@gmail.com, Ankita Mishra: ankitamishra30032005@gmail.com.
# LIS_New
# LIS_Clone
