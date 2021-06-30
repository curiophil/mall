import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    });

    // instance.interceptors.request.use(
    //     config => {
    //         console.log('请求成功')
    //         return config
    //     },
    //     error => {
    //         console.log('请求失败')
    //     })

    instance.interceptors.response.use(value => {
      return value.data
    }, error => {
      console.log(error)
    })

    return instance(config)
}
