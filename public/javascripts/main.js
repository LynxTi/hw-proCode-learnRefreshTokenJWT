const createUserForm = document.querySelector('.createUserForm');
const authForm = document.querySelector('.authForm');
const authBlock = document.querySelector('.auth');

createUserForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const {data} = await axios.post('/createUser', formData);
    
});

authForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const {data} = await axios.post('/loginUser', formData);
    const {status, accesstoken, refreshToken} = data; 

    if(status === 'logged in') {
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('refreshToken', refreshToken);

        console.log(localStorage);
        chekToken();
    }
});

const chekToken = async () => {
    accesstoken = localStorage.getItem('accesstoken');
    refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) return;

    const {data} = await axios.post('/chekToken', {accesstoken, refreshToken});
    console.log('data: ', data);
    const {status, login, id, newAccesstoken, newRefreshToken} = data;

    if(status === 'ok') {
        localStorage.setItem('accesstoken', newAccesstoken);
        localStorage.setItem('refreshToken', newRefreshToken);

        authBlock.innerHTML = 'Залогинено, юхуху! Привет ' + login; 
    } else {
        authBlock.innerHTML = 'invalid token';
    }
}

chekToken();