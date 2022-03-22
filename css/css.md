#### 圆角渐变颜色边框
分两层
1. 外层背景做成颜色渐变,使用padding做边框宽度
2. 里面正常做圆角
```
.img-box{
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #2EA0D4, #F264FF);
    border-radius: 50%;
    padding: 2px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}
```

### 垂直居中
`vertical-align: middle`