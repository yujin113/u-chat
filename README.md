<h1 align="middle">유챗</h1>
<p align="middle">누구나 참여할 수 있는 다대다 웹 채팅 서비스</p>
<img src="https://user-images.githubusercontent.com/73515587/209417210-0ee889a8-2e48-42d5-8595-078f346475dd.gif">
<br>

## 💬 서비스 소개

<img width="1829" alt="유챗 screenshot" src="https://user-images.githubusercontent.com/73515587/205440390-cd4998e0-a0c4-4746-a749-c1f605bbdd9a.png" >

랜딩 페이지입니다. 채팅방 전체 목록이 보이고, 가장 최근 메시지 내용과 전송 시간 정보를 함께 조회할 수 있습니다. 채팅방 목록은 가장 최근에 전송된 메시지가 있는 채팅방 순으로 내림차순 조회됩니다. 상단 메뉴바에서 My Chat을 클릭하면 내가 속한 채팅방만 모아볼 수 있습니다.

<img width="1904" alt="방생성" src="https://user-images.githubusercontent.com/73515587/209416847-2ed15048-7800-41e3-8e2d-fc5925137d5b.png">

랜딩 페이지에서 New Chat 버튼을 클릭하면 새로운 채팅방을 개설할 수 있습니다. 방 제목을 입력하고 생성하기 버튼을 누르면 내가 만든 채팅방으로 이동합니다.

<img width="1904" alt="입장" src="https://user-images.githubusercontent.com/73515587/209416862-c1f938e6-836b-4279-921b-db8e7c24da1f.png">

채팅방 입장 시에는 클릭한 채팅방에 대한 참여자 정보가 들어있는 모달이 뜨게 됩니다. 입장하기 버튼을 누르면 채팅방으로 입장하게 되고, 취소 버튼을 누르면 다시 랜딩 페이지로 돌아갑니다.

<img width="1904" alt="채팅" src="https://user-images.githubusercontent.com/73515587/209416859-e98a290f-f8e0-4ff5-b7bd-d25984e3dcb5.png">

채팅방을 클릭하면 위와 같이 다대다 채팅에 참여할 수 있습니다. 왼쪽의 방 정보 탭에서 방 제목, 참여자 수, 참여자 닉네임 정보를 조회할 수 있습니다. Stomp를 이용하여 실시간 메시지를 구현했고, 채팅방 입퇴장 알림과 채팅 메시지는 채팅창에서 실시간으로 조회할 수 있습니다.

<br>

## ⚙️ 기술스택

### 🧷 프론트엔드

**Language |** Typescript

**Framework |** React

**Library |** React Router, Axios

### 🧷 백엔드

**Language |** Java 11

**Framework |** Spring Boot 2.7.4

**Build Tool |** Gradle 7.5.1
