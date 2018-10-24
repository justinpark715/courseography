import React from 'react';
import ReactDOM from 'react-dom';

import { CoursePanel } from './course_panel.js.jsx';
import { SearchPanel } from './search_panel.js.jsx';

export class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLectures: [],
      selectedCourses: []
    };
  }

  render() {
    return (
      <div>
        <CoursePanel
          selectedCourses={this.state.selectedCourses}
          selectedLectures={this.state.selectedLectures}
          removeCourse={this.removeSelectedCourse}
          clearCourses={this.clearSelectedCourses}
          addSelectedLecture={this.addSelectedLecture}
          removeSelectedLecture={this.removeSelectedLecture}
        />
        <SearchPanel
          selectedCourses={this.state.selectedCourses}
          selectCourse={this.addSelectedCourse}
          removeCourse={this.removeSelectedCourse}
        />
      </div>
    );
  }
}