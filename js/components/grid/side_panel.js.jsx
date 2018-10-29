import React from 'react';

import { CoursePanel } from './course_panel.js.jsx';
import { SearchPanel } from './search_panel.js.jsx';

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
    return (
      <div id="search-layout" className="col-sm-3 col-xs-6">
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
        <button id="clear-all" key="clear-all-grid" onClick={this.clearAllCourses}>
          Clear All
        </button>
        <div>
          <CoursePanel
            selectedCourses={this.props.selectedCourses}
            selectedLectures={this.props.selectedLectures}
            removeCourse={this.removeCourse}
            clearCourses={this.clearCourses}
            addSelectedLecture={this.addSelectedLecture}
            removeSelectedLecture={this.removeSelectedLecture}
          />
        </div>
        <div>
          <SearchPanel
            value={this.state.value}
            selected={this.state.selected}
            selectedCourses={this.props.selectedCourses}
            selectCourse={this.selectCourse}
            removeCourse={this.removeCourse}
          />
        </div>
      </div>
    );
  }
}