import React from 'react';

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
    //Set correct id tags for search container and course select wrapper
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
      <div className="col-sm-3" id="search-layout">
        <div id="filter-container">
          <form onSubmit={() => false} >
            <input
              id="course-filter"
              className="form-control"
              placeholder="Enter a course!"
              autoComplete="off"
              type="text"
              value={this.state.value}
              onChange={this.handleInput}
            />
          </form>
        </div>

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
    );
  }
}
