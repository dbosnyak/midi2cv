import React from 'react'
import {connect} from 'react-redux'

import {Col, Jumbotron, Navbar, Nav, Row} from 'react-bootstrap'

import Config from 'lib/panels/config/configPanel'
import Monitor from 'lib/panels/monitor'

const mapStateToProps = (state) => ({
	status: state.midi.status,
	error: state.midi.error
})

const Navigation = () =>
	<Navbar fluid>
		<Navbar.Header>
			<Navbar.Brand>
				<span>
					<i className='fa fa-fw fa-music'></i>
					&nbsp;
					Webconfig for Miarph MIDI2CV Eurorack module
				</span>
			</Navbar.Brand>
			<Navbar.Toggle/>
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav pullRight>
				<Navbar.Brand>
					<small className='text-muted'>
						by <a href='http://www.tomarus.com/' target='_blank'>Tomarus Internet Media</a>
						&nbsp;
						@<a href='https://github.com/tomarus/midi2cv' target='_blank'>github</a>
					</small>
				</Navbar.Brand>
			</Nav>
		</Navbar.Collapse>
	</Navbar>

const Main = () =>
	<Row fill>
		<Col md={12}>
			<Row fill>
				<Col md={12}><Config/></Col>
			</Row>
			<Row fill>
				<Col md={12}><Monitor/></Col>
			</Row>
		</Col>
	</Row>

const Init = () =>
	<h3>Initializing...</h3>

const Error = (props) =>
	<Row>
		<Col xs={2}/>
		<Col xs={8}>
			<Jumbotron>
				<Row>
					<Col xs={2}/>
					<Col xs={8}>
						<h1>No MIDI Available</h1>
						<p>This website requires Web MIDI and atleast one MIDI port.</p>
						<p>For more information on Web MIDI visit <a href='https://www.midi.org/articles/about-web-midi'>https://www.midi.org/articles/about-web-midi</a></p>
						<p><a href='https://github.com/tomarus/mid2cv' target='_blank'>View this project on github.</a></p>
						<p></p>
						<small className='text-muted'>If you really think this is an error, you might view your console output to see any error mesages returned from the MIDI system.</small>
					</Col>
					<Col xs={2}/>
				</Row>
			</Jumbotron>
		</Col>
		<Col xs={2}/>
	</Row>

@connect(mapStateToProps)
export default class extends React.Component {
	render () {
		let content
		if (this.props.error !== '') {
			content = (<Error msg={this.props.error}/>)
		} else if (this.props.status === 0) {
			content = (<Init/>)
		} else {
			content = (<Main/>)
		}

		return (
			<div>
				<Navigation/>
				{content}
			</div>
		)
	}
}
