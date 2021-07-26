import {animate, animateChild, query, state, style, transition, trigger} from '@angular/animations';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Query,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Skill} from '../Skill';
import {Framework} from '../Framework';
import {Project} from '../Project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideLeftRight', [
      state('on', style({
        left: '0%',
        display: 'contents'
      })),
      state('off', style({
        display: 'none'
      })),
      transition('* => on', [
        animate('0s')
      ]),

      //doesnt work with display contents
      // transition('* => off', [
      //   animate('0.3s', style({left: '-100%'})),
      // ]),

    ]),
    trigger('changeBg1', [
      state('on', style({
        background: '#6b6b6b'
      })),
      state('off', style({
        background: '#000000'
      })),
      transition('*=>*', [
        animate('0.3s')
      ])
    ]),
    trigger('changeBg2', [
      state('on', style({
        background: '#ff7600'
      })),
      state('off', style({
        background: '#000000'
      })),
      transition('*=>*', [
        animate('0.3s')
      ])
    ]),
    trigger('changeBg3', [
      state('on', style({
        background: '#323232'
      })),
      state('off', style({
        background: '#000000'
      })),
      transition('*=>*', [
        animate('0.3s')
      ])
    ]),
    trigger('selectSkill', [
      state('selected', style({
        border: '5px solid var(--selected-color)'
      })),
      state('unset', style({
        border: 'unset'
      })),
      transition('*=>*', [
        animate('0.3s')
      ])
    ])
]
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('section') sections: QueryList<ElementRef>;
  @ViewChild('skillBox') skillBox: ElementRef;
  @ViewChildren('previewImg') previewImg: QueryList<ElementRef>;
  skillBoxEl: HTMLElement;
  sectionHeights;

  skills = [
    new Skill(new Framework('FullStack MERN', '/icons/react.png'),
      'NodeJS and React',
      [new Project('GroupShare', '/projects_previews/groupshare.png', 'Youtube Clone', 'http://54.177.13.144/', 'https://github.com/taesookim0412/GroupShare'),
        new Project('Portfolio - Interactive', '/projects_previews/in_progress.jpg', 'New Portfolio', 'http://54.193.14.94/'),

        new Project('Frontend Project', '/projects_previews/expcon.png', 'Warner Derivative', 'http://54.176.218.106/', 'https://github.com/taesookim0412/FrontendLandingPage')]
    ),
    new Skill(new Framework('FullStack MEAN', '/icons/angular.png'),
      'NodeJS and Angular',
      [new Project('TkBlog', '/projects_previews/tkblog_home.png', 'Blog for images with admin panel', 'http://50.18.238.237/', 'https://github.com/taesookim0412/TkBlog'),
        new Project('Annotation', '/projects_previews/annotation_dog.png', 'Image Segmentation App', 'http://54.215.97.177/'),
      ]),
    new Skill(new Framework('Python', '/icons/python.png'),
      'Python scripts',
      []
    ),
    new Skill(new Framework('TensorFlow', '/icons/TF_FullColor_Stacked.png'),
      'Computer Vision',
      []),
    new Skill(new Framework('Android applications', ''),
      'Android applications',
      [
        new Project('Category Trivia', '/projects_previews/category_trivia.png', '', 'https://appetize.io/app/gkdjcvc7e04pbaymd0rvaaeenc', 'https://github.com/taesookim0412/TriviaApp'),
        new Project('Trivia Alarm', '/projects_previews/alarm.png', 'Alarm with Trivia', '')
      ]
    ),

  ];
  hoverSkill = 0;
  currentSection: number;
  currentProject: Project;
  currentPreviewImgUrl: any;
  currentPreviewTitle: any;
  currentPreviewDesc: any;
  currentPreviewUrl: any;
  currentSourceUrl: any;

  resetSectionHeights() {
    this.sectionHeights[0] = 0;
    this.sections.forEach((el, i) => {
      const elElement: HTMLElement = el.nativeElement;
      this.sectionHeights[i + 1] = el.nativeElement.offsetTop;
      //console.log(el.nativeElement.scrollHeight);


    });
  }


  // @HostListener('window:scroll')
  // onScroll() {
  //   // console.log(`height: ${elm.clientHeight}`);
  //   // console.log(`width: ${elm.clientWidth}`);
  //   // console.log(window.scrollY);
  //   // const height = elm.clientHeight;
  //   // const width = elm.clientWidth;
  //   const currentY = window.scrollY;
  //
  //   for (let i = 0; i < this.sectionHeights.length; i++) {
  //     const sectionHeight = this.sectionHeights[i];
  //     if (currentY > sectionHeight / 2 && currentY < sectionHeight * 1.5) {
  //       this.currentSection = i;
  //       return;
  //     } else {
  //       this.currentSection = 0;
  //     }
  //   }
  //
  //
  // }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.sectionHeights = new Array(this.sections.length);
    this.resetSectionHeights();
    this.skillBoxEl = this.skillBox.nativeElement;
  }

  ngOnInit(): void {
    this.hoverSkill = 0;
    //TODO 07/13/2021 ? why?
    setTimeout(() => {
    this.setSkill(0);
    this.setProject(this.skills[0].projects[0]);
    }, 500)
  }


  setSkill(i) {
    this.hoverSkill = i;
    const mainProject = this.skills[i].projects[0];
    if (mainProject !== undefined) {
      this.setProject(mainProject);
    } else {
      this.currentPreviewImgUrl = '';
      this.currentPreviewTitle = '';
      this.currentPreviewDesc = '';
      this.currentPreviewUrl = '';
      this.currentSourceUrl = '';
    }

    //set to default

  }
  setProject(project: Project): void{
    this.currentProject = project;
    this.setPreviewImg(project);
  }

  setPreviewImg(project) {
    this.currentPreviewImgUrl = project.previewImgUrl;
    this.currentPreviewTitle = project.name;
    this.currentPreviewDesc = project.previewDesc;
    this.currentPreviewUrl = project.previewUrl;
    this.currentSourceUrl = project.sourceUrl;
  }
  scrollToProjects(){
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    window.scrollTo({left: 0, top: vh, behavior: 'smooth'});
  }

  expandTopAndLeft() {
    // const elem = document.getElementsByClassName("trianglebutton__outer")[0] as HTMLSpanElement;


  }
}
