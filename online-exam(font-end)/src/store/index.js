import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const actions = {}
const getters={
    getToken(state) {
        if (!state.user.token) {
          state.user.token = localStorage.getItem('token')
        }
        return state.user.token
        }    
}
const mutations = {
    GetMajor(state,value) {
        state.selectedMajors = value
    },
    setToken(state, token) {
        state.user.token = token
        localStorage.token = token //同步存储token至localStorage
      },
    setUsername(state,name)
    {
        state.user.username=name
        state.user.name=name
        localStorage.username=name//同步存储token至localStorage

    },
    setPassword(state,password)
    {
        state.user.password=password
        localStorage.password=password
    },
    setUserID(state,userID)
    {
        state.user.userID=userID
        state.user.id=userID
        localStorage.id=userID
    },
    setUserType(state,usertype)
    {
        state.user.type=usertype
        state.user.usertype=usertype
        localStorage.type=usertype
    },
    setQuestion(state,question)
    {
        state.question=question
    }
}
const state = {
    user:{
      userID:'',
      usertype:'',
      username:'',
      password:'',
      token:'',
      id:'',
      type:'',
      name:''
    },
    selectedMajors: [],
    question:{
        answer:'',
        description:'',
        id:'',
        majorId:'',
        majorName:'',
        selectionA:'',
        selectionB:'',
        selectionC:'',
        selectionD:'',
        selectionE:'',
        selectionF:'',
        selectionNum:'',
        typeId:''
    },
    // username:'',
    // password:'',
    // token:'',
    menu: [
        {
            index: '1',
            title: '题库管理',
            content: [
                {
                    item1: '所有题库', path: '/allQuestion'
                },
                {
                    item2: '新增题目', path: '/newQuestion'
                },
                ]

        },
        {
            index: '2',
            title: '专业管理',
            content: [
            { item1: '专业组卷', path: '/allMajor' }],
        },
        {
            index: '3',
            title: '管理员管理',
            content: [
                { item1: '管理员详细信息',path:'/allManager'}, 
                { item2:'管理员账号信息',path:'/accountManager'},
                { item3: '新增管理员', path: '/addManager' },]
        },
        {
            index: '4',
            title: '学生管理',
            content: [
                {item1: '学生详细信息',path:'/allStudent'},
                {item2:'学生账号信息',path:'accountStudent'},
                {item3:'新增学生',path:'/addStudent'}
            ]
                
        },
    ]
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})