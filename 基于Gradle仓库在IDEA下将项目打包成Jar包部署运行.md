## 基于Gradle仓库在IDEA下将项目打包成Jar包部署运行

1.打包前的编译，保证打包后的代码是修改后的代码；

![1562318569483](typora-user-images\1562318569483.png)

2.当你的Spring项目采用的Gradle仓库的时候，可以直接打包成jar方式发布

![1562318700311](typora-user-images\1562318700311.png)

3.双击bootJar后，可以在控制台下面看到对应jar包生成；等到执行完成后

![1562318779848](typora-user-images\1562318779848.png)

4.运行，可以通过cmd，将命令转移到该jar包所在的位置；

```java
//通过该命令在cmd中执行即可
java -jar 名字.jar 
```





