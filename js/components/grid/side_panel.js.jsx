import React from 'react';

import SelectSearch from 'react-select-search'

import { Course } from './course_panel.js.jsx';
import { CourseList } from './search_panel.js.jsx';

export class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    // From SearchPanel
    this.state = { value: ''};

    // From Grid
    this.selectCourse = this.props.selectCourse.bind(this);
    this.clearCourses = this.props.clearCourses.bind(this);
    this.removeCourse = this.props.removeCourse.bind(this);
    this.addSelectedLecture = this.props.addSelectedLecture.bind(this);
    this.removeSelectedLecture = this.props.removeSelectedLecture.bind(this);

    // Moved up from SearchPanel
    this.handleInput = this.handleInput.bind(this);

    // From CoursePanel
    this.clearAllCourses = this.clearAllCourses.bind(this);
  }

  // From SearchPanel
  handleInput(event) {
    this.setState({ value: event.target.value });
  }

  // From CoursePanel
  clearAllCourses() {
    if (window.confirm("Clear all selected courses?")) {
      this.clearCourses();
    }
  }

  render() {
    let search_container_id = (this.state.value != "") ? "search-container" : "search-container-empty"
    let course_select_wrapper_id = (this.state.value != "") ? "course-select-wrapper" : "course-select-wrapper-full"

    const courses = this.props.selectedCourses.map(
      course => <Course key={course}
                        selectedLectures={this.props.selectedLectures}
                        courseCode={course}
                        removeCourse={this.props.removeCourse}
                        addSelectedLecture={this.props.addSelectedLecture}
                        removeSelectedLecture={this.props.removeSelectedLecture}/>)

    return (
      <div className="col-sm-3">
        <div id="search-layout">
          <CourseSearch
            value={this.state.value}
            handleInput={this.handleInput}
          />
          <div id={search_container_id}>
            <CourseList
              courseFilter={this.state.value.toUpperCase()}
              selectedCourses={this.props.selectedCourses}
              selectCourse={this.selectCourse}
              removeCourse={this.removeCourse}
            />
          </div>
          <button id="clear-all" key="clear-all-grid" onClick={this.clearAllCourses}>
            Clear All
          </button>
          <div id={course_select_wrapper_id}>
            <ul className="trapScroll-enabled" id="course-select">
              {courses}
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

const options = [
  {name: 'CSC104H1', value: 'CSC104H1'},
  {name: 'CSC108H1', value: 'CSC108H1'}
];

class SelectSearchComp extends React.Component {
  render() {
    return (
      <SelectSearch
        name="SearchBox"
        className="select-search-box"
        value={[]}
        options={options}
        placeholder="Enter a course!"
      />
    );
  }
}


class CourseSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.props.handleInput.bind(this);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    // AJAX requests allow the programmer to:
    //    1. update a webpage without refreshing
    //    2. Request data from a server AFTER the webpage is loaded
    //    3. Send data to the server - in the background

    // This makes an AJAX call to retrieve courses from the database
    fetch(
      'all-courses', // url to which the AJAX request is sent to
    )
      .then(response => response.text())
      .then(data => {
        // searches through all of the courses in "data",
        // and stores each individual course code name
        // into 'courses' list
        let courses = data.split('\n').map(course => course.substring(0, 8));
        this.setState({ courses: courses });
      });
  }

  render() {
    let searchList = [];
    // If there are courses to be filtered
    if (this.props.value !== '') {
      // From the "courses" list, filter out elements based off of the prop "courseFilter" passed to
      // CourseList by SearchPanel
      searchList = this.state.courses.filter(
        course => course.indexOf(this.props.value) > -1
      ).map(course => <CourseEntry
          course={course}
          key={course}
          selectCourse={this.props.selectCourse}
          removeCourse={this.props.removeCourse}
          selectedCourses={this.props.selectedCourses}
        />
      );
    }

    return (
      <div id="filter-container">
        <form onSubmit={() => false} >
          <input
            id="course-filter"
            className="form-control"
            placeholder="Enter a course!"
            autoComplete="off"
            type="text"
            value={this.props.value}
            onChange={this.handleInput}
          />
        </form>
      </div>
    )
  }

}