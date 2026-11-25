
import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, StatusBar, Alert
} from 'react-native';

const Y = '#FFE500';
const BG = '#080808';
const CARD = '#191919';
const WHITE = '#FFFFFF';
const MUTED = '#A5A5A5';

const RAW = {
  'Egyptian Arabic': ['🇪🇬','Egyptian',
    'إزيك؟|Ezzayyak? / Ezzayyek?|How are you?|الحمد لله، كويس|Elhamdulillah, kwayyes|I’m good, thank God.|What does Ezzayyak mean?|How are you?',
    'اسمك إيه؟|Ismak eh? / Ismik eh?|What is your name?|اسمي ...|Ismi ...|My name is ...|How do you ask someone’s name?|What is your name?',
    'إنت منين؟|Enta minein? / Enti minein?|Where are you from?|أنا من لندن|Ana min London|I’m from London.|What does Enta minein mean?|Where are you from?',
    'عايز كشري، من فضلك|Aayez koshari, min fadlak|I’d like koshari, please.|حاضر|Hader|Certainly.|Which phrase means please?|Min fadlak',
    'فين المحطة؟|Fein el-mahatta?|Where is the station?|على طول وبعدين يمين|Ala tool, we ba3dein yemeen|Straight ahead, then right.|What does Fein mean?|Where',
    'بكام ده؟|Bikam da?|How much is this?|بعشرين جنيه|Be-3eshreen geneih|It’s twenty pounds.|How do you ask the price?|Bikam da?',
    'ممكن تساعدني؟|Momken tsa3edni?|Can you help me?|طبعاً|Tab3an|Of course.|What does Momken tsa3edni mean?|Can you help me?',
    'نتقابل بكرة؟|Net2abel bokra?|Shall we meet tomorrow?|تمام، أشوفك بعدين|Tamam, ashofak ba3dein|Great, see you later.|What does Bokra mean?|Tomorrow'
  ],
  'Levantine Arabic': ['🇱🇧','Levantine',
    'كيفك؟|Kifak? / Kifik?|How are you?|منيح، الحمد لله|Mnih, elhamdulillah|I’m good, thank God.|What does Kifak mean?|How are you?',
    'شو اسمك؟|Shu ismak? / Shu ismik?|What is your name?|اسمي ...|Ismi ...|My name is ...|How do you say my name is?|Ismi',
    'إنت من وين؟|Enta min wein? / Enti min wein?|Where are you from?|أنا من لندن|Ana min London|I’m from London.|What does Min wein mean?|From where',
    'بدي شاورما، لو سمحت|Baddi shawarma, law samaht|I’d like a shawarma, please.|أكيد|Akeed|Of course.|What does Baddi mean?|I want',
    'وين المحطة؟|Wein el-mahatta?|Where is the station?|هونيك عاليمين|Honeik 3al-yameen|Over there on the right.|What does Wein mean?|Where',
    'قديش هاد؟|Adeish had?|How much is this?|عشرة دنانير|3ashra dananeer|Ten dinars.|How do you ask the price?|Adeish had?',
    'ما فهمت، ممكن تعيد؟|Ma fhemet, momken t3eed?|I didn’t understand, can you repeat?|أكيد، ولا يهمك|Akeed, wala yhemmak|Of course, no problem.|What does Ma fhemet mean?|I didn’t understand',
    'بنشوفك بكرا|Mnshoufak bokra|See you tomorrow.|يلا، مع السلامة|Yalla, ma3 el-salameh|Alright, goodbye.|What does Bokra mean?|Tomorrow'
  ],
  'Moroccan Darija': ['🇲🇦','Moroccan',
    'لاباس؟|Labas?|Are you well?|لاباس، الحمد لله|Labas, lhamdulillah|I’m fine, thank God.|What does Labas mean?|Are you well?',
    'شنو سميتك؟|Shnu smiytek?|What is your name?|سميتي ...|Smiyti ...|My name is ...|How do you say my name is?|Smiyti',
    'منين نتا؟|Mnine nta? / Mnine nti?|Where are you from?|أنا من لندن|Ana men London|I’m from London.|What does Mnine mean?|From where',
    'بغيت قهوة، عافاك|Bghit qahwa, 3afak|I’d like a coffee, please.|بالصحة|Besseha|Enjoy / to your health.|What does Bghit mean?|I want',
    'فين الطوبيس؟|Fin tobiss?|Where is the bus?|تماك|Temmak|Over there.|What does Fin mean?|Where',
    'بشحال هادا؟|Bshhal hada?|How much is this?|بعشرين درهم|B3شرين dirham|Twenty dirhams.|How do you ask the price?|Bshhal hada?',
    'ما فهمتش|Ma fhemtsh|I didn’t understand.|نعاود ليك|N3awed lik|I’ll repeat it for you.|What does Ma fhemtsh mean?|I didn’t understand',
    'نتلاقاو غدا؟|Ntla9aw ghdda?|Shall we meet tomorrow?|إن شاء الله|Inshallah|God willing.|What does Ghdda mean?|Tomorrow'
  ],
  'Iraqi Arabic': ['🇮🇶','Iraqi',
    'شلونك؟|Shlonak? / Shlonich?|How are you?|زين، الحمد لله|Zein, alhamdulillah|Good, thank God.|What does Shlonak mean?|How are you?',
    'شسمك؟|Shismak? / Shismich?|What is your name?|اسمي ...|Ismi ...|My name is ...|How do you ask someone’s name?|Shismak?',
    'منين إنت؟|Minein inta? / inti?|Where are you from?|آني من لندن|Ani min London|I’m from London.|What does Minein mean?|From where',
    'أريد چاي، إذا ممكن|Areed chai, idha mumkin|I’d like tea, if possible.|تدلل|Tfadhal|Certainly / go ahead.|What does Areed mean?|I want',
    'وين السوق؟|Wain esooq?|Where is the market?|قريب من هنا|Qareeb min hina|Near here.|What does Wain mean?|Where',
    'شكد الحساب؟|Shgad el-hisab?|How much is the bill?|عشرة آلاف|3ashra alaf|Ten thousand.|How do you ask how much?|Shgad',
    'ما أفتهم، ممكن تعيد؟|Ma aftaham, mumkin t3eed?|I don’t understand, can you repeat?|أكيد|Akeed|Of course.|What does Ma aftaham mean?|I don’t understand',
    'باچر نتلاقى؟|Bacher netlaqa?|Shall we meet tomorrow?|إي، أشوفك|Ee, ashofak|Yes, see you.|What does Bacher mean?|Tomorrow'
  ],
  'Gulf Arabic': ['🇸🇦','Gulf',
    'شخبارك؟|Shakhbarak? / Shakhbarich?|How are you? / What’s the news?|بخير، الله يسلمك|Bikhair, Allah ysalmak|Fine, thank you.|What does Shakhbarak mean?|How are you?',
    'شسمك؟|Shismak? / Shismich?|What is your name?|اسمي ...|Ismi ...|My name is ...|How do you ask someone’s name?|Shismak?',
    'من وين إنت؟|Min wein inta? / inti?|Where are you from?|أنا من لندن|Ana min London|I’m from London.|What does Min wein mean?|From where',
    'أبي قهوة، لو سمحت|Abi gahwa, law samaht|I’d like a coffee, please.|من عيوني|Min 3yooni|Of course / gladly.|What does Abi mean?|I want',
    'وين أقرب سوبرماركت؟|Wain aqrab supermarket?|Where is the nearest supermarket?|قريب من هني|Qareeb min hni|It’s nearby.|What does Wain mean?|Where',
    'بكم هذا؟|Bikam hatha?|How much is this?|بعشرة ريالات|B3ashara riyalat|Ten riyals.|How do you ask the price?|Bikam hatha?',
    'عادي، ما عليه|3adi, ma 3aleih|It’s okay, no worries.|مشكور|Mashkoor|Thank you.|What does Ma 3aleih mean?|No worries',
    'نشوفك عقب|Nshoofak 3agib|See you later.|في أمان الله|Fi aman Allah|Goodbye / go in peace.|What does 3agib mean?|Later'
  ],
  'Algerian Darija': ['🇩🇿','Algerian',
    'واش راك؟|Wesh rak? / Wesh raki?|How are you?|لاباس، الحمد لله|Labas, hamdullah|I’m fine, thank God.|What does Wesh rak mean?|How are you?',
    'واش اسمك؟|Wesh smek?|What is your name?|اسمي ...|Ismi ...|My name is ...|How do you ask someone’s name?|Wesh smek?',
    'منين راك؟|Mnine rak? / Mnine raki?|Where are you from?|أنا من لندن|Ana men London|I’m from London.|What does Mnine mean?|From where',
    'نحب قهوة، من فضلك|Nhebb qahwa, men fadlek|I’d like a coffee, please.|بالصحة|Besseha|Enjoy / to your health.|What does Nhebb mean?|I want',
    'وين كاينة المحطة؟|Win kayna el-mahatta?|Where is the station?|قريبة من هنا|Qriba men hna|It’s near here.|What does Win mean?|Where',
    'شحال هذا؟|Shhal hada?|How much is this?|بألف دينار|Belf dinar|One thousand dinars.|How do you ask the price?|Shhal hada?',
    'ما فهمتش، عاود من فضلك|Ma fhemtsh, 3awed men fadlek|I didn’t understand, repeat please.|ماشي مشكل|Mashi moshkil|No problem.|What does Ma fhemtsh mean?|I didn’t understand',
    'نتلاقاو غدوة؟|Netla9aw ghedwa?|Shall we meet tomorrow?|إن شاء الله|Inshallah|God willing.|What does Ghedwa mean?|Tomorrow'
  ]
};

const TITLES = [
  'First conversations','Introducing yourself','Where are you from?',
  'Ordering something','Finding your way','Shopping and prices',
  'Everyday conversation','Making plans'
];

const COURSES = Object.entries(RAW).map(([name,data]) => ({
  name,
  flag:data[0],
  region:data[1],
  note:name==='Iraqi Arabic'
    ? 'An introduction to everyday Iraqi Arabic, with a Baghdadi-oriented starting point. Vocabulary and pronunciation vary across Iraq.'
    : name==='Gulf Arabic'
    ? 'An introduction to broadly familiar Khaleeji expressions. Gulf dialects differ across countries, cities and families.'
    : name==='Algerian Darija'
    ? 'Everyday Algerian Darija. Regional variation is common, and French loanwords are often heard in conversation.'
    : 'A practical introduction to everyday expressions. Pronunciation and vocabulary can vary by region and speaker.',
  lessons:data.slice(2).map((s,i)=>{
    const p=s.split('|');
    return {
      title:TITLES[i],
      phrase:p[0],
      latin:p[1],
      meaning:p[2],
      reply:p[3],
      replyLatin:p[4],
      replyMeaning:p[5],
      question:p[6],
      answer:p[7],
      options:[p[7],'Thank you','Goodbye']
    };
  })
}));

const START_POSTS = [
  {id:1,user:'Mariam',flag:'🇪🇬',dialect:'Egyptian Arabic',tag:'Question',text:'What are some everyday Egyptian expressions that you would use with friends rather than in a textbook?',likes:12,comments:[]},
  {id:2,user:'Omar',flag:'🇲🇦',dialect:'Moroccan Darija',tag:'Expression',text:'Today’s expression: واخا (wakha) — often used to mean “okay” or “alright”. How do you use it?',likes:18,comments:[]},
  {id:3,user:'Layla',flag:'🇮🇶',dialect:'Iraqi Arabic',tag:'Discussion',text:'I’m interested in the differences between Iraqi Arabic and other dialects. What words do you use every day?',likes:9,comments:[]},
  {id:4,user:'Khalid',flag:'🇸🇦',dialect:'Gulf Arabic',tag:'Conversation',text:'What is a phrase your family uses all the time that you rarely see in learning materials?',likes:15,comments:[]},
  {id:5,user:'Yasmine',flag:'🇩🇿',dialect:'Algerian Darija',tag:'Question',text:'For Algerian speakers: which expressions would you teach someone visiting Algeria for the first time?',likes:21,comments:[]},
  {id:6,user:'Rana',flag:'🇱🇧',dialect:'Levantine Arabic',tag:'Culture',text:'What is your favourite Levantine expression that does not translate neatly into English?',likes:11,comments:[]}
];

const PEOPLE = [
  {name:'Mariam',flag:'🇪🇬',dialect:'Egyptian Arabic',about:'Native speaker from Cairo. Loves films, food and everyday expressions.'},
  {name:'Omar',flag:'🇲🇦',dialect:'Moroccan Darija',about:'Moroccan speaker interested in cultural exchange and helping learners connect.'},
  {name:'Layla',flag:'🇮🇶',dialect:'Iraqi Arabic',about:'Iraqi speaker who enjoys discussing language, music and traditions.'},
  {name:'Khalid',flag:'🇸🇦',dialect:'Gulf Arabic',about:'Khaleeji speaker interested in meeting learners and sharing expressions.'},
  {name:'Yasmine',flag:'🇩🇿',dialect:'Algerian Darija',about:'Algerian speaker who loves language, travel and cultural conversations.'},
  {name:'Rana',flag:'🇱🇧',dialect:'Levantine Arabic',about:'Levantine speaker interested in language exchange and meeting new people.'}
];

const ROOMS = [
  {id:'general',name:'General Arabic Chat',dialect:'All dialects',flag:'🌍',description:'Meet learners and speakers from across the Arabic-speaking world.'},
  {id:'egypt',name:'Egyptian Arabic',dialect:'Egyptian Arabic',flag:'🇪🇬',description:'Discuss Egyptian expressions, culture and everyday conversation.'},
  {id:'levant',name:'Levantine Arabic',dialect:'Levantine Arabic',flag:'🇱🇧',description:'Practise Levantine and share regional expressions.'},
  {id:'morocco',name:'Moroccan Darija',dialect:'Moroccan Darija',flag:'🇲🇦',description:'Connect through Moroccan Darija.'},
  {id:'iraq',name:'Iraqi Arabic',dialect:'Iraqi Arabic',flag:'🇮🇶',description:'Talk about Iraqi vocabulary and culture.'},
  {id:'gulf',name:'Gulf Arabic',dialect:'Gulf Arabic',flag:'🇸🇦',description:'Explore Khaleeji expressions and differences.'},
  {id:'algeria',name:'Algerian Darija',dialect:'Algerian Darija',flag:'🇩🇿',description:'Share Algerian Darija and regional expressions.'}
];

const Button = ({children,onPress,active=false,small=false}) => (
  <TouchableOpacity onPress={onPress} style={[styles.button,active&&styles.activeButton,small&&styles.smallButton]}>
    <Text style={[styles.buttonText,active&&{color:BG}]}>{children}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [tab,setTab]=useState('Home');
  const [course,setCourse]=useState(null);
  const [lessonIndex,setLessonIndex]=useState(0);
  const [selected,setSelected]=useState(null);
  const [completed,setCompleted]=useState({});
  const [posts,setPosts]=useState(START_POSTS);
  const [filter,setFilter]=useState('All');
  const [postText,setPostText]=useState('');
  const [postTag,setPostTag]=useState('Discussion');
  const [showComposer,setShowComposer]=useState(false);
  const [profileName,setProfileName]=useState('Guest learner');
  const [bio,setBio]=useState('Learning Arabic dialects and connecting with speakers.');
  const [search,setSearch]=useState('');
  const [liked,setLiked]=useState([]);
  const [communityView,setCommunityView]=useState('Feed');
  const [profileViewing,setProfileViewing]=useState(null);
  const [commentDrafts,setCommentDrafts]=useState({});
  const [reports,setReports]=useState([]);
  const [room,setRoom]=useState(null);
  const [messages,setMessages]=useState({});
  const [messageDraft,setMessageDraft]=useState('');
  const [testQuestions,setTestQuestions]=useState([]);
  const [testIndex,setTestIndex]=useState(0);
  const [testChoice,setTestChoice]=useState(null);
  const [testAnswers,setTestAnswers]=useState({});
  const [testFinished,setTestFinished]=useState(false);

  const total=48;
  const done=Object.keys(completed).filter(k=>completed[k]).length;
  const current=course?COURSES.find(c=>c.name===course):null;
  const lesson=current?current.lessons[lessonIndex]:null;

  const startCourse=name=>{
    setCourse(name);
    setLessonIndex(0);
    setSelected(null);
    setTab('Lesson');
  };

  const changeLesson=index=>{
    setLessonIndex(Math.max(0,Math.min(7,index)));
    setSelected(null);
  };

  const finishLesson=()=>{
    const key=course+'-'+lessonIndex;
    setCompleted(p=>({...p,[key]:true}));
    Alert.alert('Lesson completed!','Great work. Your progress has been updated.',[
      {text:'Continue',onPress:()=>{
        if(lessonIndex<7) changeLesson(lessonIndex+1);
        else {setTab('Learn');setCourse(null);}
      }}
    ]);
  };

  const buildExam=name=>{
    const dialect=COURSES.find(c=>c.name===name);
    if(!dialect) return;
    const ls=dialect.lessons;
    const recall=ls.map((l,i)=>({
      type:'English → Arabic',
      prompt:`How would you say “${l.meaning}” in ${name}?`,
      correct:l.phrase,
      options:[l.phrase,ls[(i+2)%8].phrase,ls[(i+5)%8].phrase],
      explanation:`${l.phrase} (${l.latin}) means “${l.meaning}”.`,
      lesson:i
    }));
    const comprehension=ls.map((l,i)=>({
      type:'Arabic → English',
      prompt:'What does this Arabic expression mean?',
      arabic:l.phrase,
      transliteration:l.latin,
      correct:l.meaning,
      options:[l.meaning,ls[(i+2)%8].meaning,ls[(i+5)%8].meaning],
      explanation:`${l.phrase} (${l.latin}) means “${l.meaning}”.`,
      lesson:i
    }));
    const replies=ls.map((l,i)=>({
      type:'Conversation replies',
      prompt:'Which Arabic reply was taught in this lesson?',
      context:l.meaning,
      correct:l.reply,
      options:[l.reply,ls[(i+2)%8].reply,ls[(i+5)%8].reply],
      explanation:`The reply taught was ${l.reply} (${l.replyLatin}), meaning “${l.replyMeaning}”.`,
      lesson:i
    }));
    return [...recall,...comprehension,...replies];
  };

  const startTest=name=>{
    const target=name||course;
    if(!target) return;
    setCourse(target);
    setTestQuestions(buildExam(target));
    setTestIndex(0);
    setTestChoice(null);
    setTestAnswers({});
    setTestFinished(false);
    setTab('Test');
  };

  const nextTestQuestion=()=>{
    if(testChoice===null) return;
    const updated={...testAnswers,[testIndex]:testChoice};
    setTestAnswers(updated);
    if(testIndex===testQuestions.length-1){
      setTestFinished(true);
    } else {
      setTestIndex(i=>i+1);
      setTestChoice(null);
    }
  };

  const testScore=testQuestions.reduce((score,q,i)=>score+(testAnswers[i]===q.correct?1:0),0);

  const addPost=()=>{
    if(!postText.trim()) return Alert.alert('Write something first','Add a message before publishing.');
    setPosts(p=>[{
      id:Date.now(),user:profileName,flag:'🌍',
      dialect:filter==='All'?'General':filter,
      tag:postTag,text:postText.trim(),likes:0,comments:[]
    },...p]);
    setPostText('');
    setShowComposer(false);
    Alert.alert('Post published','Your post has been added to the community feed.');
  };

  const addComment=postId=>{
    const draft=(commentDrafts[postId]||'').trim();
    if(!draft) return;
    setPosts(old=>old.map(p=>p.id===postId?{
      ...p,comments:[...(p.comments||[]),{
        id:Date.now(),user:profileName,text:draft
      }]
    }:p));
    setCommentDrafts(old=>({...old,[postId]:''}));
  };

  const reportPost=post=>{
    if(reports.some(r=>r.postId===post.id)){
      Alert.alert('Already reported','This post has already been added to the moderation queue.');
      return;
    }
    Alert.alert('Report post','Would you like to report this post to the moderation team?',[
      {text:'Cancel',style:'cancel'},
      {text:'Report',style:'destructive',onPress:()=>{
        setReports(old=>[...old,{
          id:Date.now(),postId:post.id,user:post.user,text:post.text,
          reason:'Community report',status:'Under review'
        }]);
        Alert.alert('Report submitted','Thank you. This post has been added to the moderation queue.');
      }}
    ]);
  };

  const resolveReport=id=>{
    setReports(old=>old.map(r=>r.id===id?{...r,status:'Reviewed'}:r));
  };

  const sendMessage=()=>{
    if(!room||!messageDraft.trim()) return;
    setMessages(old=>({
      ...old,
      [room.id]:[...(old[room.id]||[]),{
        id:Date.now(),user:profileName,text:messageDraft.trim()
      }]
    }));
    setMessageDraft('');
  };

  const Header=({title,sub})=>(
    <View style={styles.header}>
      <Text style={styles.brand}>BEYT <Text style={{color:Y}}>AL-LAHJAT</Text></Text>
      <Text style={styles.heading}>{title}</Text>
      {!!sub&&<Text style={styles.muted}>{sub}</Text>}
    </View>
  );

  const Card=({children,style})=>(
    <View style={[styles.card,style]}>{children}</View>
  );

  const CourseCard=({item})=>{
    const count=item.lessons.filter((_,i)=>completed[item.name+'-'+i]).length;
    return (
      <TouchableOpacity style={styles.courseCard} onPress={()=>startCourse(item.name)}>
        <View style={styles.courseTop}>
          <Text style={styles.flag}>{item.flag}</Text>
          <View style={{flex:1}}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.muted}>{item.region} Arabic · 8 lessons</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill,{width:(count/8*100)+'%'}]}/>
        </View>
        <Text style={styles.tiny}>{count}/8 lessons completed</Text>
        <TouchableOpacity onPress={()=>startTest(item.name)} style={styles.testLink}>
          <Text style={styles.testLinkText}>Take end-of-unit test →</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const Home=()=>(
    <ScrollView contentContainerStyle={styles.content}>
      <Header title="Welcome home" sub="Learn. Connect. Share."/>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>YOUR ARABIC JOURNEY STARTS HERE</Text>
        <Text style={styles.heroTitle}>More than a language. A connection.</Text>
        <Text style={styles.heroText}>Explore Arabic dialects, learn everyday expressions and connect with people who speak them.</Text>
        <Button active onPress={()=>setTab('Learn')}>Explore dialects →</Button>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statNumber}>{done}</Text><Text style={styles.tiny}>Lessons done</Text></View>
        <View style={styles.stat}><Text style={styles.statNumber}>{total}</Text><Text style={styles.tiny}>Lessons available</Text></View>
        <View style={styles.stat}><Text style={styles.statNumber}>6</Text><Text style={styles.tiny}>Dialects</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Explore dialects</Text>
      {COURSES.map(c=><CourseCard key={c.name} item={c}/>)}
      <Text style={styles.sectionTitle}>From the community</Text>
      {posts.slice(0,2).map(p=>(
        <Card key={p.id}>
          <TouchableOpacity onPress={()=>setProfileViewing(p.user)}>
            <Text style={styles.postMeta}>{p.flag} {p.user} · {p.dialect}</Text>
          </TouchableOpacity>
          <Text style={styles.body}>{p.text}</Text>
          <Text style={styles.tiny}>♥ {p.likes} likes · {(p.comments||[]).length} comments</Text>
        </Card>
      ))}
    </ScrollView>
  );

  const Learn=()=>(
    <ScrollView contentContainerStyle={styles.content}>
      <Header title="Learn" sub="Choose a dialect and start learning."/>
      <Card>
        <Text style={styles.sectionTitle}>Your progress</Text>
        <Text style={styles.progressText}>{done} of {total} lessons completed</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill,{width:(done/total*100)+'%'}]}/>
        </View>
      </Card>
      <Text style={styles.sectionTitle}>Available dialects</Text>
      {COURSES.map(c=><CourseCard key={c.name} item={c}/>)}
    </ScrollView>
  );

  const Lesson=()=>{
    if(!lesson||!current) return <Learn/>;
    const answered=selected!==null;
    const correct=selected===lesson.answer;

    return (
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity onPress={()=>setTab('Learn')}>
          <Text style={styles.back}>‹ Back to dialects</Text>
        </TouchableOpacity>
        <Header title={current.name} sub={`Lesson ${lessonIndex+1} of 8 · ${lesson.title}`}/>
        <Card>
          <Text style={styles.tiny}>ABOUT THIS DIALECT</Text>
          <Text style={styles.body}>{current.note}</Text>
        </Card>
        <Card>
          <Text style={styles.eyebrow}>THE SITUATION</Text>
          <Text style={styles.body}>{lesson.title}</Text>
          <Text style={styles.muted}>Imagine yourself in this everyday situation and learn what to say.</Text>
        </Card>
        <View style={styles.phraseBox}>
          <Text style={styles.eyebrow}>YOUR PHRASE</Text>
          <Text style={styles.arabic}>{lesson.phrase}</Text>
          <Text style={styles.translit}>{lesson.latin}</Text>
          <Text style={styles.meaning}>{lesson.meaning}</Text>
        </View>
        <Card>
          <Text style={styles.eyebrow}>A POSSIBLE REPLY</Text>
          <Text style={styles.arabicSmall}>{lesson.reply}</Text>
          <Text style={styles.translit}>{lesson.replyLatin}</Text>
          <Text style={styles.body}>{lesson.replyMeaning}</Text>
        </Card>
        <Text style={styles.sectionTitle}>Quick check</Text>
        <View style={[styles.quizCard,answered&&(correct?styles.correctGlow:styles.wrongGlow)]}>
          <Text style={styles.body}>{lesson.question}</Text>
          {lesson.options.map((option,i)=>{
            const chosen=selected===option;
            return (
              <TouchableOpacity key={i} onPress={()=>setSelected(option)} activeOpacity={0.8}
                style={[styles.option,chosen&&(correct?styles.optionCorrect:styles.optionWrong)]}>
                <Text style={[styles.optionText,chosen&&styles.optionChosenText]}>{option}</Text>
                {chosen&&<Text style={styles.optionMark}>{correct?'✓':'✕'}</Text>}
              </TouchableOpacity>
            );
          })}
          {answered&&(
            <View style={[styles.feedbackBox,correct?styles.feedbackCorrect:styles.feedbackWrong]}>
              <Text style={[styles.feedbackTitle,{color:correct?'#75FF9C':'#FF7777'}]}>
                {correct?'✓ CORRECT!':'✕ INCORRECT'}
              </Text>
              <Text style={styles.feedbackText}>
                {correct?'Excellent work! You selected the right answer.':'That is not the right answer. Try another option.'}
              </Text>
              {!correct&&<Text style={styles.feedbackHint}>Have another go — you can do it!</Text>}
            </View>
          )}
          <TouchableOpacity activeOpacity={0.8}
            onPress={()=>{
              if(!answered) Alert.alert('Choose an answer','Select an option first.');
              else if(!correct) Alert.alert('Try again','Choose the correct answer to complete this lesson.');
              else finishLesson();
            }}
            style={[styles.completeButton,correct&&styles.completeButtonActive]}>
            <Text style={[styles.completeButtonText,correct&&{color:BG}]}>Complete lesson</Text>
          </TouchableOpacity>
        </View>
        <Button active onPress={()=>startTest(course)}>Take the end-of-unit test →</Button>
        <View style={styles.row}>
          <Button small onPress={()=>changeLesson(lessonIndex-1)}>Previous</Button>
          <Button small onPress={()=>changeLesson(lessonIndex+1)}>Next lesson →</Button>
        </View>
      </ScrollView>
    );
  };

  const Test=()=>{
    if(!testQuestions.length) return <ScrollView contentContainerStyle={styles.content}><Header title="End-of-unit test"/><Text style={styles.body}>Choose a dialect course before starting your test.</Text><Button active onPress={()=>setTab('Learn')}>Choose a dialect</Button></ScrollView>;

    if(testFinished){
      return (
        <ScrollView contentContainerStyle={styles.content}>
          <Header title="Test results" sub={course}/>
          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>END-OF-UNIT ASSESSMENT</Text>
            <Text style={styles.heroTitle}>{testScore} / 24</Text>
            <Text style={styles.heroText}>{Math.round(testScore/24*100)}% correct</Text>
            <Text style={styles.body}>{testScore>=20?'Excellent work. You have demonstrated a strong understanding of this unit.':testScore>=14?'Good effort. Review the questions below to strengthen your understanding.':'Keep practising. Use the answer review to revisit the lessons and try again.'}</Text>
          </View>
          <Text style={styles.sectionTitle}>Your answer review</Text>
          {testQuestions.map((q,i)=>{
            const right=testAnswers[i]===q.correct;
            return (
              <Card key={i}>
                <Text style={styles.tiny}>QUESTION {i+1} · {q.type}</Text>
                <Text style={styles.body}>{q.prompt}</Text>
                {!!q.arabic&&<Text style={styles.arabicSmall}>{q.arabic}</Text>}
                <Text style={[styles.body,{color:right?'#75FF9C':'#FF7777'}]}>
                  Your answer: {testAnswers[i]||'No answer'}
                </Text>
                {!right&&<Text style={styles.body}>Correct answer: {q.correct}</Text>}
                <Text style={styles.muted}>{q.explanation}</Text>
              </Card>
            );
          })}
          <Button active onPress={()=>startTest(course)}>Retake test</Button>
          <Button onPress={()=>setTab('Learn')}>Back to courses</Button>
        </ScrollView>
      );
    }

    const q=testQuestions[testIndex];
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={()=>Alert.alert('Leave test?','Your current attempt will be lost.',[
          {text:'Stay',style:'cancel'},
          {text:'Leave',style:'destructive',onPress:()=>setTab('Learn')}
        ])}>
          <Text style={styles.back}>‹ Leave test</Text>
        </TouchableOpacity>
        <Header title="End-of-unit test" sub={course}/>
        <Card>
          <Text style={styles.tiny}>QUESTION {testIndex+1} OF {testQuestions.length}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill,{width:((testIndex+1)/testQuestions.length*100)+'%'}]}/>
          </View>
          <Text style={styles.eyebrow}>{q.type}</Text>
          <Text style={styles.body}>{q.prompt}</Text>
          {!!q.arabic&&<Text style={styles.arabic}>{q.arabic}</Text>}
          {!!q.transliteration&&<Text style={styles.translit}>{q.transliteration}</Text>}
          {!!q.context&&<Text style={styles.meaning}>{q.context}</Text>}
          {q.options.map((option,i)=>{
            const chosen=testChoice===option;
            return (
              <TouchableOpacity key={i} onPress={()=>!testChoice&&setTestChoice(option)}
                style={[styles.option,chosen&&styles.optionSelected]}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
          {!!testChoice&&(
            <View style={[styles.feedbackBox,testChoice===q.correct?styles.feedbackCorrect:styles.feedbackWrong]}>
              <Text style={styles.feedbackTitle}>
                {testChoice===q.correct?'✓ CORRECT':'✕ NOT QUITE'}
              </Text>
              <Text style={styles.feedbackText}>
                {testChoice===q.correct?'Well done. Your answer is correct.':'The correct answer is: '+q.correct}
              </Text>
              <Text style={styles.feedbackText}>{q.explanation}</Text>
            </View>
          )}
          <Button active={!!testChoice} onPress={nextTestQuestion}>
            {testIndex===23?'Finish test':'Next question →'}
          </Button>
        </Card>
        <Text style={styles.tiny}>The test covers the main expressions, meanings and replies from all eight lessons.</Text>
      </ScrollView>
    );
  };

  const openProfile=name=>{
    setProfileViewing(name);
    setTab('ProfileView');
  };

  const ProfileView=()=>{
    const person=PEOPLE.find(p=>p.name===profileViewing);
    const own=profileViewing===profileName;
    if(own) return <Profile/>;
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={()=>setTab('Community')}><Text style={styles.back}>‹ Back to community</Text></TouchableOpacity>
        <Header title="Member profile" sub="Open community profile"/>
        <Card>
          <Text style={styles.profileIcon}>{person?person.flag:'🌍'}</Text>
          <Text style={styles.sectionTitle}>{person?person.name:profileViewing}</Text>
          <Text style={styles.muted}>{person?person.dialect:'Beyt Al-Lahjat member'}</Text>
          <Text style={styles.body}>{person?person.about:'Community member sharing language and culture.'}</Text>
          <Text style={styles.tiny}>Profiles are open to community members.</Text>
          <Button active onPress={()=>{setRoom(ROOMS[0]);setTab('Chat');}}>Start a conversation</Button>
        </Card>
        <Text style={styles.sectionTitle}>Posts by {profileViewing}</Text>
        {posts.filter(p=>p.user===profileViewing).map(p=>(
          <Card key={p.id}>
            <Text style={styles.tiny}>{p.dialect} · {p.tag}</Text>
            <Text style={styles.body}>{p.text}</Text>
            <Text style={styles.tiny}>♥ {p.likes} likes · {(p.comments||[]).length} comments</Text>
          </Card>
        ))}
      </ScrollView>
    );
  };

  const Community=()=>{
    const filtered=posts.filter(p=>
      (filter==='All'||p.dialect===filter)&&
      (p.text.toLowerCase().includes(search.toLowerCase())||
       p.user.toLowerCase().includes(search.toLowerCase()))
    );

    return (
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
        <Header title="Community" sub="A place to share, discuss and connect."/>
        <View style={styles.rowWrap}>
          {['Feed','Chat rooms','Moderation'].map(v=>(
            <Button key={v} small active={communityView===v} onPress={()=>setCommunityView(v)}>{v}</Button>
          ))}
        </View>

        {communityView==='Feed'&&(
          <>
            <TextInput style={styles.input} placeholder="Search conversations..." placeholderTextColor={MUTED} value={search} onChangeText={setSearch}/>
            <Button active onPress={()=>setShowComposer(v=>!v)}>{showComposer?'Close composer':'＋ Create a post'}</Button>
            {showComposer&&(
              <Card>
                <Text style={styles.sectionTitle}>Create a post</Text>
                <Text style={styles.muted}>Everyone can publish. Share a question, expression, discussion or cultural insight.</Text>
                <TextInput style={[styles.input,{height:110,textAlignVertical:'top'}]} multiline blurOnSubmit={false} placeholder="What would you like to share?" placeholderTextColor={MUTED} value={postText} onChangeText={setPostText}/>
                <Text style={styles.label}>Post type</Text>
                <View style={styles.rowWrap}>
                  {['Discussion','Question','Expression','Culture'].map(t=><Button key={t} small active={postTag===t} onPress={()=>setPostTag(t)}>{t}</Button>)}
                </View>
                <Text style={styles.label}>Dialect</Text>
                <View style={styles.rowWrap}>
                  {['All',...COURSES.map(c=>c.name)].map(t=><Button key={t} small active={filter===t} onPress={()=>setFilter(t)}>{t}</Button>)}
                </View>
                <Button active onPress={addPost}>Publish post</Button>
              </Card>
            )}
            <Text style={styles.sectionTitle}>Explore discussions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:12}}>
              {['All',...COURSES.map(c=>c.name)].map(t=>(
                <TouchableOpacity key={t} onPress={()=>setFilter(t)} style={[styles.filter,filter===t&&styles.filterActive]}>
                  <Text style={{color:filter===t?BG:WHITE,fontWeight:'700'}}>{t}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {filtered.map(p=>(
              <Card key={p.id}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={()=>openProfile(p.user)}>
                    <Text style={styles.postMeta}>{p.flag} {p.user}</Text>
                  </TouchableOpacity>
                  <Text style={styles.tag}>{p.tag}</Text>
                </View>
                <Text style={styles.tiny}>{p.dialect}</Text>
                <Text style={styles.body}>{p.text}</Text>
                <View style={styles.row}>
                  <TouchableOpacity onPress={()=>setLiked(a=>a.includes(p.id)?a.filter(x=>x!==p.id):[...a,p.id])}>
                    <Text style={styles.like}>{liked.includes(p.id)?'♥':'♡'} {p.likes+(liked.includes(p.id)?1:0)} likes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>reportPost(p)}>
                    <Text style={styles.reportText}>Report</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Discussion · {(p.comments||[]).length} comments</Text>
                {(p.comments||[]).map(c=>(
                  <View key={c.id} style={styles.comment}>
                    <TouchableOpacity onPress={()=>openProfile(c.user)}>
                      <Text style={styles.commentUser}>{c.user}</Text>
                    </TouchableOpacity>
                    <Text style={styles.body}>{c.text}</Text>
                  </View>
                ))}
                <TextInput
                  style={styles.input}
                  placeholder="Write a comment..."
                  placeholderTextColor={MUTED}
                  value={commentDrafts[p.id]||''}
                  onChangeText={v=>setCommentDrafts(old=>({...old,[p.id]:v}))}
                  onSubmitEditing={()=>addComment(p.id)}
                  returnKeyType="send"
                />
                <Button small active onPress={()=>addComment(p.id)}>Add comment</Button>
              </Card>
            ))}
            {filtered.length===0&&<Text style={styles.muted}>No posts found. Try another filter or search.</Text>}
            <Text style={styles.tiny}>This is a local prototype. A backend is needed to synchronise posts and comments between users.</Text>
          </>
        )}

        {communityView==='Chat rooms'&&(
          <>
            <Text style={styles.sectionTitle}>Community chat rooms</Text>
            <Text style={styles.muted}>Join a room to discuss a dialect, ask questions and connect with other learners.</Text>
            {ROOMS.map(r=>(
              <TouchableOpacity key={r.id} style={styles.courseCard} onPress={()=>{setRoom(r);setTab('Chat');}}>
                <View style={styles.courseTop}>
                  <Text style={styles.flag}>{r.flag}</Text>
                  <View style={{flex:1}}>
                    <Text style={styles.cardTitle}>{r.name}</Text>
                    <Text style={styles.muted}>{r.dialect}</Text>
                    <Text style={styles.tiny}>{r.description}</Text>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {communityView==='Moderation'&&(
          <>
            <Text style={styles.sectionTitle}>Moderation centre</Text>
            <Text style={styles.muted}>Reported posts are collected here for review. In this prototype, reports are stored locally.</Text>
            <Text style={styles.sectionTitle}>Reports · {reports.length}</Text>
            {reports.length===0&&<Card><Text style={styles.body}>There are no reported posts at the moment.</Text></Card>}
            {reports.map(r=>(
              <Card key={r.id}>
                <Text style={styles.postMeta}>Reported post · {r.user}</Text>
                <Text style={styles.body}>{r.text}</Text>
                <Text style={styles.tiny}>Reason: {r.reason}</Text>
                <Text style={styles.tiny}>Status: {r.status}</Text>
                {r.status!=='Reviewed'&&<Button small active onPress={()=>resolveReport(r.id)}>Mark as reviewed</Button>}
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    );
  };

  const Chat=()=>{
    if(!room) return <Community/>;
    const roomMessages=messages[room.id]||[];
    return (
      <View style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
          <TouchableOpacity onPress={()=>{setTab('Community');setCommunityView('Chat rooms');}}>
            <Text style={styles.back}>‹ Back to chat rooms</Text>
          </TouchableOpacity>
          <Header title={room.name} sub={room.description}/>
          {roomMessages.length===0&&(
            <Card><Text style={styles.body}>Welcome to the room. Start the conversation!</Text></Card>
          )}
          {roomMessages.map(m=>(
            <Card key={m.id}>
              <Text style={styles.commentUser}>{m.user}</Text>
              <Text style={styles.body}>{m.text}</Text>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.chatComposer}>
          <TextInput style={[styles.input,{flex:1,marginBottom:0}]} placeholder="Write a message..." placeholderTextColor={MUTED} value={messageDraft} onChangeText={setMessageDraft}/>
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Exchange=()=>{
    const matches=PEOPLE.filter(p=>
      (filter==='All'||p.dialect===filter)&&
      (p.name.toLowerCase().includes(search.toLowerCase())||
       p.dialect.toLowerCase().includes(search.toLowerCase()))
    );
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Language exchange" sub="Meet speakers and learn through conversation."/>
        <TextInput style={styles.input} placeholder="Search speakers or dialects..." placeholderTextColor={MUTED} value={search} onChangeText={setSearch}/>
        <Text style={styles.sectionTitle}>Find a conversation partner</Text>
        <View style={styles.rowWrap}>
          {['All',...COURSES.map(c=>c.name)].map(t=><Button key={t} small active={filter===t} onPress={()=>setFilter(t)}>{t}</Button>)}
        </View>
        {matches.map(p=>(
          <Card key={p.name}>
            <TouchableOpacity style={styles.personRow} onPress={()=>openProfile(p.name)}>
              <Text style={styles.personFlag}>{p.flag}</Text>
              <View style={{flex:1}}>
                <Text style={styles.cardTitle}>{p.name}</Text>
                <Text style={styles.muted}>{p.dialect}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
            <Text style={styles.body}>{p.about}</Text>
            <Button small onPress={()=>openProfile(p.name)}>View open profile</Button>
          </Card>
        ))}
        <Text style={styles.tiny}>These are example profiles for the prototype, not registered users.</Text>
      </ScrollView>
    );
  };

  const Profile=()=>(
    <ScrollView contentContainerStyle={styles.content}>
      <Header title="Your profile" sub="Make your space your own."/>
      <Card>
        <Text style={styles.profileIcon}>🌍</Text>
        <Text style={styles.sectionTitle}>Your details</Text>
        <Text style={styles.label}>Display name</Text>
        <TextInput style={styles.input} value={profileName} onChangeText={setProfileName} placeholder="Your name" placeholderTextColor={MUTED}/>
        <Text style={styles.label}>About you</Text>
        <TextInput style={[styles.input,{height:90,textAlignVertical:'top'}]} multiline value={bio} onChangeText={setBio} placeholder="Tell the community about yourself" placeholderTextColor={MUTED}/>
        <Button active onPress={()=>Alert.alert('Profile saved','Your changes have been saved in this prototype.')}>Save profile</Button>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Learning progress</Text>
        <Text style={styles.statNumber}>{done}/{total}</Text>
        <Text style={styles.muted}>Lessons completed</Text>
        <View style={styles.progressTrack}><View style={[styles.progressFill,{width:(done/total*100)+'%'}]}/></View>
        {COURSES.map(c=><Text key={c.name} style={styles.body}>{c.flag} {c.name}: {c.lessons.filter((_,i)=>completed[c.name+'-'+i]).length}/8</Text>)}
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>About Beyt Al-Lahjat</Text>
        <Text style={styles.body}>A place to learn Arabic dialects, connect with native speakers and share the language and culture that bring people together.</Text>
        <Text style={styles.yellowText}>Learn. Connect. Share.</Text>
      </Card>
    </ScrollView>
  );

  // Keep nested screens called directly to preserve input focus and scroll state.
  let screen;
  if(tab==='Home') screen=<Home/>;
  else if(tab==='Learn') screen=<Learn/>;
  else if(tab==='Lesson') screen=Lesson();
  else if(tab==='Test') screen=<Test/>;
  else if(tab==='Community') screen=Community();
  else if(tab==='Chat') screen=Chat();
  else if(tab==='Exchange') screen=<Exchange/>;
  else if(tab==='ProfileView') screen=ProfileView();
  else screen=<Profile/>;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG}/>
      <View style={styles.topbar}>
        <Text style={styles.brand}>BEYT <Text style={{color:Y}}>AL-LAHJAT</Text></Text>
        <Text style={styles.topSub}>LEARN · CONNECT · SHARE</Text>
      </View>
      <View style={{flex:1}}>{screen}</View>
      <View style={styles.nav}>
        {[
          ['Home','⌂'],['Learn','▤'],['Community','◎'],
          ['Exchange','⇄'],['Profile','○']
        ].map(([name,icon])=>(
          <TouchableOpacity key={name}
            onPress={()=>{setTab(name);setSearch('');setFilter('All');setProfileViewing(null);}}
            style={styles.navItem}>
            <Text style={[styles.navIcon,{color:tab===name?Y:MUTED}]}>{icon}</Text>
            <Text style={[styles.navText,{color:tab===name?Y:MUTED}]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:BG},
  topbar:{paddingHorizontal:20,paddingTop:12,paddingBottom:10,borderBottomWidth:1,borderBottomColor:'#292929'},
  brand:{fontSize:20,fontWeight:'900',letterSpacing:1.5,color:WHITE},
  topSub:{fontSize:9,color:MUTED,letterSpacing:2,marginTop:4},
  content:{padding:18,paddingBottom:35},
  header:{marginBottom:20},
  heading:{fontSize:29,fontWeight:'900',color:WHITE,marginTop:15},
  muted:{fontSize:13,color:MUTED,lineHeight:20,marginTop:4},
  tiny:{fontSize:11,color:MUTED,marginTop:7,lineHeight:17},
  hero:{backgroundColor:Y,borderRadius:18,padding:22,marginBottom:16},
  heroEyebrow:{fontSize:10,fontWeight:'900',letterSpacing:1.4,color:BG},
  heroTitle:{fontSize:30,fontWeight:'900',color:BG,marginTop:13,lineHeight:35},
  heroText:{fontSize:14,color:'#252525',lineHeight:22,marginTop:10,marginBottom:18},
  button:{backgroundColor:'#292929',paddingVertical:13,paddingHorizontal:16,borderRadius:10,alignItems:'center',marginTop:9,marginRight:7},
  smallButton:{paddingVertical:8,paddingHorizontal:12},
  activeButton:{backgroundColor:Y},
  buttonText:{color:WHITE,fontWeight:'800',fontSize:13},
  stats:{flexDirection:'row',gap:9,marginBottom:22},
  stat:{flex:1,backgroundColor:CARD,padding:13,borderRadius:12,alignItems:'center'},
  statNumber:{fontSize:25,fontWeight:'900',color:Y},
  sectionTitle:{fontSize:19,fontWeight:'900',color:WHITE,marginTop:17,marginBottom:10},
  card:{backgroundColor:CARD,borderRadius:14,padding:16,marginBottom:12,borderWidth:1,borderColor:'#292929'},
  courseCard:{backgroundColor:CARD,borderRadius:14,padding:15,marginBottom:10,borderWidth:1,borderColor:'#292929'},
  courseTop:{flexDirection:'row',alignItems:'center',gap:12},
  flag:{fontSize:29},
  cardTitle:{fontSize:16,fontWeight:'800',color:WHITE},
  arrow:{fontSize:28,color:Y},
  progressTrack:{height:6,backgroundColor:'#373737',borderRadius:10,overflow:'hidden',marginTop:13},
  progressFill:{height:6,backgroundColor:Y,borderRadius:10},
  progressText:{fontSize:13,color:WHITE},
  back:{fontSize:14,color:Y,marginBottom:12},
  eyebrow:{fontSize:10,color:Y,fontWeight:'900',letterSpacing:1.5,marginBottom:10},
  phraseBox:{backgroundColor:'#242000',borderWidth:1,borderColor:Y,borderRadius:16,padding:20,marginBottom:12,alignItems:'center'},
  arabic:{fontSize:34,color:WHITE,textAlign:'center',marginVertical:10},
  arabicSmall:{fontSize:27,color:WHITE,textAlign:'right',marginBottom:8},
  translit:{fontSize:15,color:Y,textAlign:'center',marginBottom:7},
  meaning:{fontSize:16,color:WHITE,textAlign:'center'},
  body:{fontSize:14,color:WHITE,lineHeight:22,marginTop:7},
  quizCard:{backgroundColor:'#191919',borderWidth:3,borderColor:'#555555',borderRadius:16,padding:16,marginBottom:14},
  correctGlow:{backgroundColor:'#06391C',borderColor:'#00FF66'},
  wrongGlow:{backgroundColor:'#3D1010',borderColor:'#FF3030'},
  option:{padding:14,borderWidth:1,borderColor:'#555555',borderRadius:10,marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#242424'},
  optionCorrect:{backgroundColor:'#08752D',borderColor:'#00FF66',borderWidth:2},
  optionWrong:{backgroundColor:'#8A1717',borderColor:'#FF3030',borderWidth:2},
  optionSelected:{backgroundColor:'#3D3500',borderColor:Y,borderWidth:2},
  optionText:{color:WHITE,fontSize:14,fontWeight:'600',flex:1},
  optionChosenText:{color:WHITE,fontWeight:'900'},
  optionMark:{fontSize:22,fontWeight:'900',color:WHITE,marginLeft:10},
  feedbackBox:{padding:15,borderRadius:10,marginTop:15},
  feedbackCorrect:{backgroundColor:'#064D22',borderWidth:2,borderColor:'#00FF66'},
  feedbackWrong:{backgroundColor:'#651313',borderWidth:2,borderColor:'#FF3030'},
  feedbackTitle:{fontSize:19,fontWeight:'900',color:WHITE},
  feedbackText:{fontSize:14,color:WHITE,lineHeight:21,marginTop:6},
  feedbackHint:{fontSize:13,color:'#FFD0D0',fontWeight:'700',marginTop:5},
  completeButton:{backgroundColor:'#353535',padding:15,borderRadius:10,alignItems:'center',marginTop:16},
  completeButtonActive:{backgroundColor:Y},
  completeButtonText:{color:WHITE,fontWeight:'900',fontSize:14},
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  rowWrap:{flexDirection:'row',flexWrap:'wrap',marginBottom:10},
  input:{backgroundColor:CARD,borderWidth:1,borderColor:'#414141',borderRadius:10,padding:13,color:WHITE,fontSize:14,marginBottom:12},
  label:{fontSize:12,color:Y,fontWeight:'800',marginTop:8,marginBottom:5},
  postHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  postMeta:{fontSize:13,color:WHITE,fontWeight:'800'},
  tag:{fontSize:10,color:BG,backgroundColor:Y,paddingHorizontal:9,paddingVertical:5,borderRadius:20,fontWeight:'900'},
  like:{fontSize:12,color:Y,marginTop:13,fontWeight:'700'},
  reportText:{fontSize:12,color:'#FF7777',marginTop:13,fontWeight:'700'},
  filter:{backgroundColor:CARD,padding:10,borderRadius:20,marginRight:7,borderWidth:1,borderColor:'#444'},
  filterActive:{backgroundColor:Y,borderColor:Y},
  personRow:{flexDirection:'row',alignItems:'center',gap:12},
  personFlag:{fontSize:34},
  profileIcon:{fontSize:45,textAlign:'center',marginBottom:8},
  yellowText:{fontSize:15,color:Y,fontWeight:'900',marginTop:14},
  testLink:{marginTop:12,paddingTop:10,borderTopWidth:1,borderTopColor:'#333'},
  testLinkText:{color:Y,fontSize:13,fontWeight:'800'},
  comment:{backgroundColor:'#242424',padding:10,borderRadius:9,marginTop:8},
  commentUser:{color:Y,fontSize:12,fontWeight:'900'},
  chatComposer:{flexDirection:'row',alignItems:'center',padding:12,backgroundColor:'#111',borderTopWidth:1,borderTopColor:'#333',gap:8},
  sendButton:{backgroundColor:Y,padding:13,borderRadius:10},
  sendButtonText:{color:BG,fontWeight:'900'},
  nav:{flexDirection:'row',backgroundColor:'#111',borderTopWidth:1,borderTopColor:'#303030',paddingTop:9,paddingBottom:8,justifyContent:'space-around'},
  navItem:{alignItems:'center',flex:1},
  navIcon:{fontSize:22,fontWeight:'800'},
  navText:{fontSize:10,fontWeight:'700',marginTop:3}
});
